"use client"

import SubsTableItem from "@/components/Admin/SubsTableItem"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

interface Email {
    _id: string;
    email: string;
    createdAt: string;
}

export default function Page () {

    const [emails, setEmails] = useState<Email[]>([])

    const fetchEmails = async () => {
        const response = await axios.get("/api/email");
        setEmails(response.data.emails);
    }

    const deleteEmail = async (mongoId: string) => {
        const response = await axios.delete('/api/email', {
            params: {
                id: mongoId
            }
        })
        if(response.data.success) {
            toast.success(response.data.msg)
        } else {
            toast.error("Error");
        }
    }
    
    useEffect(() => {
        fetchEmails();
    }, [])

    return (
        <div className="flex-1 pt-5 px-5 sm:pl-16">
            <h1>All Subscription</h1>
            <div className="relative max-w-150 h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Email Subscription
                            </th>
                            <th scope="col" className="hidden sm:block px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            emails.map((item) => {
                                return <SubsTableItem key={item._id} mongoId={item._id} deleteEmail={deleteEmail} email={item.email} date={item.createdAt} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}