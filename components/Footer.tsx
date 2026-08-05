import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Footer () {
    return (
        <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-(--text-primary) py-6 items-center px-5">
            <Link href={'/'}>
                <Image src={assets.logo_light} alt="" width={110} />
            </Link>
            <p className="text-sm text-(--bg-primary)">All rights reserved. Copyright @blogger</p>
            <div className="flex gap-3">
                <Image src={assets.facebook_icon} alt="" width={36}/>
                <Image src={assets.twitter_icon} alt="" width={36}/>
                <Image src={assets.googleplus_icon} alt="" width={36}/>
            </div>
        </div>
    )
}