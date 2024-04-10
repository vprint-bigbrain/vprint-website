'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import Link from 'next/link';

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const getUsernamefromEmail = (email) => {
        const username = email.split("%")[0];
        return username;
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("isAvailable", 0)
                    .eq("shop", getUsernamefromEmail(email))
                    .order('created_at', { ascending: false });

                console.log(getUsernamefromEmail(email));

                if (error) {
                    console.error(error);
                    return;
                }

                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (email) {
            fetchOrders();
        }
    }, [email]);


    return (
        <div className="flex flex-col mt-10 mx-10 justify-center m-auto">
            <h1 className="text-4xl font-bold text-center">Upcoming Orders</h1>
            <Table aria-label="Example static collection table" className='mt-5'>
                <TableHeader>
                    <TableColumn>Id</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Time</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>URL</TableColumn>
                    <TableColumn>Info</TableColumn>
                </TableHeader>
                <TableBody>
                    {orders.map((order, index) => {
                        const date = new Date(order.created_at);
                        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                        return (
                            <TableRow key={index}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>{`${formattedDate} ${formattedTime}`}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>
                                    <Link href={order.document_url} target="_blank" className="text-blue-500 underline">
                                        View Document
                                    </Link></TableCell>
                                <TableCell>
                                    <Link href={`/orders/${order.id}`} className="text-blue-500 underline">
                                        View Info
                                    </Link>
                                </TableCell>
                                
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}