import { orderApi } from "@/app/utils/api/OrderApi";
import { ProductTypes, productApi } from "@/app/utils/api/ProductApi";
import WebinarApi from "@/app/utils/api/WebinarApi";
import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    
    const signature = headers().get("stripe-signature");
    
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    
    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details.email) {
        throw new Error(`missing user email, ${event.id}`);
      }

        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ['line_items'],
        }
      );
      const lineItems = sessionWithLineItems.line_items;
      const boughtItems = await Promise.all(lineItems.data?.map(async (item:any) => {
          const product = await stripe.products.retrieve(item.price.product);
          switch(product.metadata.productType) {
              
              case ProductTypes.ebook: {
                  return productApi.getEbookById(product.metadata.id);
              }
              case ProductTypes.lecture: {
                  return productApi.getLectureById(product.metadata.id);
              }
              case ProductTypes.webinar: {
                  return productApi.getWebinarById(product.metadata.id);
              }
          }
      }))

      console.log('Bought items: ', boughtItems);


      const event_dates = await Promise.all(boughtItems.filter((ev) => ev.type === ProductTypes.webinar).map((webinar) => {
        console.log('Inside', webinar.id);
        return WebinarApi.createEventDate(webinar.id)
      }));
      
      const ebooks = boughtItems.filter((ebook) => ebook.type === ProductTypes.ebook).map((ebook) => ebook.id);
      const lectures = boughtItems.filter((lecture) => lecture.type === ProductTypes.lecture).map((lecture) => lecture.id );
      const preparedEventDates = event_dates.map((ev) => {
        return ev.id
      });
      await Promise.all(orderApi.createOrder(sessionWithLineItems.metadata.userId, 200, preparedEventDates, lectures, ebooks));

      return NextResponse.json({ result: event, boughtItems, event_dates: preparedEventDates, ebooks, lectures, ok: true });
    }
    
    return NextResponse.json({ result: event, ok: true });
    } catch (error) {
    
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}