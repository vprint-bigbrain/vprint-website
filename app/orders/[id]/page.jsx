'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import supabase from "@/utils/supabase";
import Link from 'next/link';

export default function OrderDetail({ params }) {
    const [order, setOrder] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const fetchOrder = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error(error);
                return;
            }
            console.log(data);
            setOrder(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchOrder();
        }
    }, [params.id]);

    const handleClick = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .update({ isAvailable: true })
                .eq('id', params.id);

            if (error) {
                console.error(error);
                return;
            }

            toast.success("Order marked as Done");
            fetchOrder(); // Call fetchOrder again to update the order data
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='mt-10 mx-[20%]'>
            <h1 className='text-center text-5xl font-semibold'>Order ID: {params.id}</h1>
            <div className='flex flex-col justify-center bg-form-dark border-border-dark border-2 rounded-lg mt-10 text-center items-center gap-3 w-[80%] m-auto py-10'>
                <div className="flex flex-row gap-5">
                    <h2 className="text-xl">Id: </h2>
                    <h2 className="text-xl font-semibold">{order.id}</h2>
                </div>
                <div className="flex flex-row gap-5">
                    <h2 className="text-xl">Time Submitted: </h2>
                    <h2 className="text-xl font-semibold">
                        {(() => {
                            const date = new Date(order.created_at);
                            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                            const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                            return `${formattedTime} ${formattedDate}`;
                        })()}
                    </h2>
                </div>
                <div className="flex flex-row gap-5">
                    <h2 className="text-2xl">Name: </h2>
                    <h2 className="text-2xl font-semibold">{order.name}</h2>
                </div>
                <div className="flex flex-row gap-5">
                    <h2 className="text-2xl">Email: </h2>
                    <h2 className="text-2xl font-semibold">{order.email}</h2>
                </div>
                <div className="flex flex-row gap-5">
                    <h2 className="text-2xl">Price: </h2>
                    <h2 className="text-2xl font-semibold">{order.price}</h2>
                </div>
                <div className="flex flex-row gap-5">
                    <h2 className="text-2xl">Pages: </h2>
                    <h2 className="text-2xl font-semibold">{order.pages}</h2>
                </div>
                <div className="flex flex-row gap-5">
                    <h2 className="text-2xl">Pages: </h2>
                    <h2 className="text-2xl font-semibold">{order.pages}</h2>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <h2 className="text-2xl">Status: </h2>
                    <h2 className={`text-2xl font-semibold border-2 p-2 ${order.isAvailable ? 'border-green-500' : 'border-red-500'}`}>
                        {order.isAvailable ? 'Done' : 'Not Done'}
                    </h2>
                </div>
                <a href={order.document_url} target="_blank"><button className="bg-purple-600 px-5 py-3 rounded-lg mt-8">View PDF</button></a>
                <button type="submit" onClick={onOpen} className="px-5 py-3 rounded-lg mt-5 bg-green-600" style={{ display: order.isAvailable ? 'none' : 'block' }}>Mark as Done</button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                                <ModalBody>
                                    <p>This will mark done for user</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => { handleClick(); onClose(); }} >
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}