// importing google font for NextJS
import LoadingOverlay from '@/components/LoadingOverlay';
import { getJSONData } from '@/tools/Toolkit';
import { Note, Orders, Order, Topping } from '@/tools/orders.model';
import { Griffy } from 'next/font/google';
const griffy = Griffy({weight: "400", subsets: ['latin']});

import React, { useState } from 'react';

export default function Home() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Orders>({ orders: [] });

  // ----------------------------- event handlers
  const onResponse = (data:Orders) => {
    console.log(data);
    setOrders(data);
    setLoading(false);
  };

  const onError = (message:string) => {
    console.log(`*** Error retrieving pizza order data : ( | ${message}`); 
    setLoading(false); 
  }; 

  const getOrders = (e:any) => {
    setLoading(true);
    // fetch the data from the api 
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError); 

  };


  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">

      <div className="flex flex-nowrap items-center justify-center 
          bg-accent bg-[url('./../lib/images/background.jpg')] bg-no-repeat bg-center bg-cover
          border-solid border-b-4 border-accent min-h-[220px] p-5 text-white">

        <header className="grow text-center md:text-left">
          <div className={`${griffy.className} text-6xl`}>Antonio's Online Pizzaria</div>
          <div className="text-sm">If it's not Antonio's, it's rubbish!</div>
        </header>

        <div className="shrink-0 hidden md:block">
          <i className="fab fa-facebook-square fa-2x ml-1"></i>
          <i className="fab fa-twitter-square fa-2x ml-1"></i>
          <i className="fab fa-instagram fa-2x ml-1"></i>
        </div>
      </div>

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
              <button 
                className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-greyContent mt-5" onClick={getOrders}>Get Orders</button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-greyContent hidden md:block">
          <div>Antonio's Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-greyAccent p-10">

        <div id="output" className="divide-dashed divide-y-2 divide-accent">
          {loading ? (
            <LoadingOverlay
              enabled={loading}
              bgColor="#b80823"
              showSpinner={true}
              spinnerColor="#FFFFFF"
            />
          ) : orders.orders.length > 0 ? (
            orders.orders.map((order: Order, index: number) => (
              <div className='pt-4 pb-4' key={order.id}>
                <h3 className='text-accent text-xl font-bold'>{order.name}</h3>
                <p>Address: {order.address}</p>
                <p>City: {order.city}</p>
                <p>Size: {order.size}</p>
                <p>Delivered: {order.delivered}</p>
                <p>Toppings:</p>
                <ul className="flex space-x-2">
                  {order.toppings.map((topping: Topping, toppingIndex: number) => (
                    // <li key={toppingIndex}>{topping.topping}</li>
                    <li key={toppingIndex} style={{ fontStyle: 'italic' }}>
                      {topping.topping}
                      {toppingIndex !== order.toppings.length - 1 && " | "}
                    </li>
                  ))}
                </ul>
                <p>Notes:</p>
                <ul className="flex space-x-2">
                  {order.notes.map((note: Note, noteIndex: number) => (
                    // <li key={noteIndex}>{note.note}</li>
                    <li key={noteIndex} style={{ fontStyle: 'italic' }}>
                      {note.note}
                      {noteIndex !== order.notes.length - 1 && " | "}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <>No orders retrieved...</>
          )}

        </div>
      </div>
    </main>
  );
}