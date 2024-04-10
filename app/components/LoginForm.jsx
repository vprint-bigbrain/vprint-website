'use client';
import { Input } from "@nextui-org/react";
import { MailIcon } from './MailIcon';
import PasswordIcon from '@mui/icons-material/Password';
import supabase from "@/utils/supabase";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
    const encodedEmail = encodeURIComponent(formData.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('admin')
                .select('*')
                .eq("email", encodedEmail)
                .eq("password", formData.password)
                .single();
            if (data === null) {
                toast.error("Invalid email or password");
                return;
            }
            if (data.length !== 0) {
                toast.success("Successfully logged in");
                localStorage.setItem('email', data.email);
                router.push("/dashboard");
            }
            else {
                console.log();
                toast.error("Invalid email or password");
            }
        }
        catch (error) {
            console.error(error.message);
        }



    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="border-[#2F2E31] border-2 p-10 rounded-xl flex flex-col gap-8 bg-form-dark justify-center shadow-xl shadow-[#050505]">
                <h1 className="text-4xl font-semibold text-center">Login</h1>
                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-2xl">Email</label>
                    <Input
                        type="email"
                        borde
                        placeholder="you@example.com"
                        id="email"
                        name="email"
                        labelPlacement="outside"
                        className="border-2 rounded-xl text-xl p-2"
                        value={formData.email}
                        onChange={handleChange}
                        startContent={
                            <MailIcon className="text-2xl pointer-events-none flex-shrink-0 text-gray-200 ml-[-5px] mr-2 border-transparent" />
                        }
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="password" className="text-2xl">Password</label>
                    <Input
                        type="password"
                        placeholder=""
                        id="password"
                        name="password"
                        labelPlacement="outside"
                        className="border-2 rounded-xl text-xl p-2"
                        value={formData.password}
                        onChange={handleChange}
                        startContent={
                            <PasswordIcon className="ml-[-5px] mr-2" />
                        }
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className={'text-center items-center text-xl bg-purple-800 px-5 py-2 rounded'}>Submit</button>
                </div>
            </form>
        </div>
    );
}