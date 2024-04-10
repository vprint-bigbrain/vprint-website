'use client';
import greetUser from '@/utils/greetUser';
import { Chart } from 'grommet';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import pfp_image from '../images/pfp.jpg';
import { Clock } from 'grommet';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import HistoryIcon from '@mui/icons-material/History';
import { CircularProgress, CardFooter, Chip, Card } from '@nextui-org/react';
import supabase from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function Dboard() {
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [allOrders,setAllOrders] = useState([])

    console.log(allOrders.filter(order=>order.isAvailable===1))

    const completedOrders = allOrders.filter(order => order.isAvailable===true).length
    const totalOrders = allOrders.length;

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        if (email) {
            getShopStatus();
        }
    }, [email]); // Add email as a dependency

    const getUsernamefromEmail = (email) => {
        const username = email.split("%")[0];
        return username;
    };

    const getShopStatus = async () => {
        try {
            const { data, error } = await supabase
                .from('shopDetails')
                .select('isOpen')
                .eq('name', getUsernamefromEmail(email))
                .single();
            setIsOpen(data['isOpen']);

        }
        catch (error) {
            console.error(error);
        }
    };

    const handleClick = async (bool) => {
        try {
            const { data, error } = await supabase
                .from('shopDetails')
                .update({ isOpen: bool })
                .eq('name', getUsernamefromEmail(email));
            getShopStatus();
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleOrderClick = () => {
        router.push('/orders');
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from("orders")
                    .select("*")

                console.log(data);
                setAllOrders(data   );
            } catch (error) {
                console.error(error);
            }
        };
        if (email) {
            fetchOrders();
        }
    }, [email]);
    
    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from("orders")
                    .select("name,pages,price,id")
                    .eq("isAvailable", 0)
                    .eq("shop", getUsernamefromEmail(email))
                    .order('created_at', { ascending: false })
                    .limit(3);
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (email) {
            fetchAllOrders();
        }
    }, [email]);

    return (
        <>
            <div className='flex flex-col mt-5 mx-10 gap-10 max-h-screen overflow-y-hidden'>
                <h1 className="text-4xl font-extrabold">Vprint</h1>
            </div>
            <div className='mt-10 mx-10 '>
                <div className='h-[45%] w-[23%] left-10 bg-form-dark text-center text-2xl absolute flex flex-col justify-center items-center rounded-xl border-border-dark border-2 hover:scale-105 transition-all ease-in-out'>
                    <h2 className={'text-2xl mb-5 font-semibold'}>{greetUser()}👋<br />{getUsernamefromEmail(email)}</h2>
                    <Image src={pfp_image} alt="" className='rounded-[50%] border-white border-3 text-center' />
                </div>
                <div className='h-[20%] w-[20%] bg-form-dark absolute flex justify-center border-border-dark border-2 rounded-lg left-[30%] hover:scale-105 transition-all ease-in-out'>
                    <Clock type='digital' size='xxlarge' alignSelf='center' className='text-center text-2xl ' />
                </div>
                <div className='w-[42%] h-[38%] left-[55%] bg-form-dark absolute rounded-lg border-border-dark border-2 hover:scale-105 transition-all ease-in-out'>
                    <div>
                        <h2 className='font-semibold text-center mt-6 text-2xl'>Upcoming Orders</h2>
                        <p className='text-right mr-2 cursor-pointer text-blue-500' onClick={handleOrderClick}>View all orders{'>>'}</p>
                        <Table aria-label="Example static collection table" className='mt-2 text-center'>
                            <TableHeader >
                                <TableColumn className='text-center'>Id</TableColumn>
                                <TableColumn className='text-center'>Name</TableColumn>
                                <TableColumn className='text-center'>Pages</TableColumn>
                                <TableColumn className='text-center'>Price</TableColumn>
                            </TableHeader>
                            <TableBody >
                                {orders.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.name}</TableCell>
                                        <TableCell>{order.pages}</TableCell>
                                        <TableCell>₹{order.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className='h-[32%] w-[23%] absolute bottom-[5%] bg-form-dark rounded border-border-dark border-2 hover:scale-105 transition-all ease-in-out flex flex-col justify-center text-center items-center gap-6 cursor-pointer' onClick={()=>router.push('/history')}>
                    <HistoryIcon fontSize='large' className='min-w-[30%] h-auto' />
                    <h2 className='text-4xl'>History</h2>
                </div>
                <div className={`h-[15%] w-[20%] bottom-[48%] bg-form-dark absolute flex justify-between flex-row border-border-dark border-2 rounded-lg left-[30%] hover:scale-105 transition-all ease-in-out items-center px-10 ${isOpen ? 'border-green-500' : 'border-red-600'}`}>
                    <h2 className='font-xl font-semibold'>Status: {isOpen === true ? 'Open' : 'Close'}</h2>
                    <button onClick={() => handleClick(isOpen ? false : true)} className='px-5 py-2 bg-purple-800 rounded-lg font-semibold'>{isOpen ? 'Close' : 'Open'}</button>
                </div>
                <Card className={'bg-form-dark w-[20%] h-[40%] bottom-[5%] absolute left-[30%] rounded-lg flex justify-center items-center flex-col gap-2 border-border-dark border-2 hover:scale-105 transition-all ease-in-out'}>
                    <h2 className='text-xl font-semibold'>Completed Orders</h2>
                    <CircularProgress
                        classNames={{
                            svg: "w-48 h-48 drop-shadow-md",
                            indicator: "stroke-white",
                            track: "stroke-white/10",
                            value: "text-3xl font-semibold text-white",
                        }}
                        value={completedOrders/totalOrders*100}
                        strokeWidth={4}
                        showValueLabel={true}
                        className='text-center items-center'
                    />
                    <CardFooter className="justify-center items-center pt-0">
                        <Chip
                            classNames={{
                                base: "border-1 border-white/30",
                                content: "text-white/90 text-small font-semibold",
                            }}
                            variant="bordered"
                        >
                            {totalOrders} Total Orders
                        </Chip>
                    </CardFooter>
                </Card>

                <div className={'bg-form-dark w-[42%] h-[40%] left-[55%] absolute bottom-[5%] flex flex-col justify-center gap-10 rounded-lg hover:scale-105 transition-all ease-in-out border-border-dark border-2 cursor-pointer'} onClick={()=>router.push('/analytics')}>
                    <h2 className='font-semibold text-center mt-6 text-2xl'>Analytics</h2>
                    <Chart
                        values={[
                            { value: [11, 40], label: 'forty' },
                            { value: [10, 10], label: 'ten' },
                            { value: [9, 30], label: 'thirty' },
                            { value: [8, 60], label: 'sixty' },
                            { value: [7, 100], label: 'one hundred' },
                            { value: [6, 70], label: 'seventy' },
                            { value: [5, 60], label: 'sixty' },
                            { value: [4, 80], label: 'eighty' },
                            { value: [3, 40], label: 'forty' },
                            { value: [2, 10], label: 'zero' },
                            { value: [1, 30], label: 'thirty' },
                            { value: [0, 60], label: 'sixty' },

                        ]}
                        aria-label="chart"
                        alignSelf='center'
                        size={{ width: 'auto' }}
                        gap='medium'
                    />

                </div>

            </div>
        </>
    );
};