"use client";

import { motion } from "motion/react";
import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { type Product } from "./data";

interface ProductModalProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

export function ProductModal({
    product,
    onClose,
    onAddToCart,
}: ProductModalProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black"
                onClick={onClose}
            />
            <motion.div
                layoutId={`product-${product.id}`}
                className="fixed inset-x-4 bottom-0 md:inset-[25%] z-50 bg-white dark:bg-zinc-900 rounded-t-xl md:rounded-xl overflow-hidden max-h-[80vh] md:max-h-[500px]"
            >
                <div className="h-full md:flex">
                    <div className="relative md:w-2/5">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[200px] md:h-full object-cover"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-3 md:w-3/5 flex flex-col">
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-sm font-medium">{product.name}</h2>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {product.category}
                                    </p>
                                </div>
                                <p className="text-sm font-medium">${product.price}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                                    {product.description}
                                </p>
                                <div className="text-xs space-y-1">
                                    <p className="text-zinc-500">SKU: {product.id}</p>
                                    <p className="text-zinc-500">Stock: Available</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => onAddToCart(product)}
                            className="w-full mt-3 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
