import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify"

interface BlogItemProps {
    item: {
        _id: string;
        title: string;
        description: string;
        image: string;
        category: string;
    };
}

export default function BlogItem ({ item } : BlogItemProps) {
    return (
        <Link href={`/blogs/${item._id}`} className="group relative block rounded-2xl overflow-hidden isolate h-80">
            <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {item.category}
                </span>
                <h5 className="text-white text-lg font-semibold leading-snug line-clamp-2 mb-2">
                    {item.title}
                </h5>
                <p
                    className="text-white/70 text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.description.slice(0,120))}}
                ></p>
            </div>
        </Link>
    )
};