import { motion } from "motion/react";
import { type Product } from "./data";

interface ProductGridProps {
    products: Product[];
    onProductSelect: (product: Product) => void;
}

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    layoutId={`product-${product.id}`}
                    onClick={() => onProductSelect(product)}
                    className="group cursor-pointer"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="aspect-[4/5] bg-white dark:bg-zinc-900 rounded-md overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="mt-1.5 space-y-0.5">
                        <h3 className="text-xs font-medium truncate">
                            {product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                ${product.price}
                            </p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                                {product.category}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
} 