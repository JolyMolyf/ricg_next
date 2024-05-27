import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'
import { ProductTypes, productApi } from "@/app/utils/api/ProductApi";
import moment from "moment";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const cartItems = await req.json();   
    
    const cartDetailsArray: any[] = await Promise.all((cartItems.products.map((item:any) => {
        switch(item.type) {
            case ProductTypes.ebook: {
                return productApi.getEbookById(item.id);
            }
            case ProductTypes.lecture: {
                return productApi.getLectureById(item.id);
            }
            case ProductTypes.webinar: {
                return productApi.getWebinarByEventDateId(item?.selectedDate?.value);
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

    const lineItems = cartDetailsArray.map((item: any) => {

        return {
            price_data: {
                currency: 'PLN',
                product_data: {
                    name: item.title,
                    description: moment(item.date).format('MMMM Do YYYY hh:mm'),
                    metadata: {
                        id: item.id,
                        eventdateid: item?.selectedDate,
                        productType: item.type
                    }
                },
                unit_amount: (item?.redeemedPrice ?? item.price) * 100,
            },
            quantity: 1,
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
                userId: cartItems.user.id,
                userEmail: cartItems.user.email
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