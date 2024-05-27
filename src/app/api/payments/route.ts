import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'
import { ProductTypes, productApi } from "@/app/utils/api/ProductApi";
import moment from "moment";
import { CartItem } from "@/store/cartSlice";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const payload:{ user: any, products: Array<CartItem> } = await req.json();   
    
    const cartDetailsArray: any[] = await Promise.all((payload.products.map(async (item) => {
        switch(item.product.type) {
            case ProductTypes.ebook: {
                const product = await productApi.getEbookById(item.product.id)
                return { quantity: item.quantity, product };
            }
            case ProductTypes.lecture: {
                const product = await productApi.getLectureById(item.product.id);
                return { quantity: item.quantity, product};
            }
            case ProductTypes.webinar: {
                const product = await productApi.getWebinarByEventDateId(item.product?.selectedDate?.value);
                return { quantity: item.quantity, product};
            }
        }
    })));

    const taxRate = await stripe.taxRates.create({
        display_name: 'EU VAT',
        inclusive: true,
        percentage: 23,
        country: 'PL',
        jurisdiction: 'PL',
        description: 'EU VAT 23%',
      });

      console.log(cartDetailsArray);

    const lineItems = cartDetailsArray.map((item: CartItem) => {

        return {
            price_data: {
                currency: 'PLN',
                product_data: {
                    name: item.product.title,
                    description: moment(item.product.date).format('MMMM Do YYYY hh:mm'),
                    metadata: {
                        id: item.product.id,
                        eventdateid: item?.product.selectedDate,
                        productType: item?.product.type
                    }
                },
                unit_amount: (item?.product.redeemedPrice ?? item?.product.price) * 100,
            },
            quantity: item.quantity,
            tax_rates: [taxRate.id],
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "blik", "p24"],
            allow_promotion_codes: true,
            tax_id_collection: {
                enabled: true,
            },
            invoice_creation: {
                enabled: true,
            },
            line_items: lineItems,
            mode: "payment",
            metadata: {
                userId: payload.user.id,
                userEmail: payload.user.email
            },
            success_url: `${headersList.get("origin")}/thank-you`,
            cancel_url: `${headersList.get("origin")}/`,
        });

        return Response.json({sessionId: session.id});
    } catch (err) {
        console.error(err)
        return Response.json({error: "Error creating checkout session"});
    }
}