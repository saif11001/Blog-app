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
            fetchEmails();
        } else {
            toast.error("Error");
        }
    }
    
    useEffect(() => {
        fetchEmails();
    }, [])

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:px-16 pb-16">
            <h1 className="text-2xl font-semibold text-(--text-primary) mb-1">All Subscriptions</h1>
            <p className="text-(--text-secondary) text-sm mb-6">{emails.length} subscriber{emails.length !== 1 ? "s" : ""}</p>

            <div className="relative max-w-3xl overflow-x-auto rounded-2xl border border-(--border-color) scrollbar-hide">
                <table className="w-full text-sm">
                    <thead className="text-xs text-(--text-secondary) text-left uppercase bg-(--bg-secondary)">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Email Subscription
                            </th>
                            <th scope="col" className="hidden sm:table-cell px-6 py-4">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--border-color)">
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