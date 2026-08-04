"use client"

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { assets } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify"

interface Blog {
    _id: string;
    title: string;
    description: string;
    author: string;
    image: string;
    authorImg: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page ({params}: PageProps) {
    const { id } = use(params);
    const [data, setData] = useState<Blog | null>(null);
    
    const fetchData = async () => {
        const response = await axios.get('/api/blog', {
            params: {
                id: id,
            }
        })
        setData(response.data)
    }
    
    useEffect(() => {
        fetchData();
    }, [id])
    
    return (
        data ? <>
            <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image src={assets.logo} alt="" width={180} className="w-32.5 sm:w-auto"/>
                    </Link>
                    <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                        Get Started <Image src={assets.arrow} alt=""/>
                    </button>
                </div>
                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-5xl font-semibold max-w-175 mx-auto">{data.title}</h1>
                    <Image className="mx-auto mt-6 border border-white rounded-full" src={data.authorImg} alt="" width={60} height={60} />
                    <p className="mt-1 pb-2 text-lg max-w-185 mx-auto">{data.author}</p>
                </div>
            </div>
            <div className="mx-5 max-w-200 md:mx-auto -mt-25 mb-10">
                <Image className="border-4 border-white" src={data.image} alt="" width={1280} height={720} />
                <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
                <div className="blog-content" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data.description)}}></div>

                <div className="my-24">
                    <p className="text-black font font-semibold my-4">Share this articleon social media</p>
                    <div className="flex">
                        <Image src={assets.facebook_icon} alt="" width={50}/>
                        <Image src={assets.twitter_icon} alt="" width={50}/>
                        <Image src={assets.googleplus_icon} alt="" width={50}/>
                    </div>
                </div>
            </div>
            <Footer />
        </> :
        <></>
    )
}