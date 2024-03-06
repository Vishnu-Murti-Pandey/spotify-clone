'use client'

import { toast } from 'react-hot-toast';
import useSubscribeModal from "@/hooks/useSubscribeModal";
import Button from "./Button"
import Modal from "./Modal"
import { useUser } from "@/hooks/useUser";
import { getStripe } from "@/libs/stripeClient";
import { postData } from '@/libs/helpers';
import { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js"

const formatPrice = (price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
}

const SubscribeModal = ({ products }) => {

    const subscribeModal = useSubscribeModal();
    const { user, isLoading, subcription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState();

    const onChange = (open) => {
        if (!open) {
            subscribeModal.onClose();
        }
    }

    const handleCheckout = async (price) => {
        setPriceIdLoading(price.id);
        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in');
        }

        if (subcription) {
            setPriceIdLoading(undefined);
            return toast('Already subscribed');
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
            stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            return toast.error(error?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    let content = (
        <div className="text-center">
            No products available.
        </div>
    )


    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices available.
                            </div>
                        )
                    }
                    return product.prices.map((price) => (
                        <Button
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className="mb-4"
                        >
                            {`Subcribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })
                }
            </div>
        )
    }

    if (subcription) {
        content = (
            <div className="text-center">
                Already subscribed.
            </div>
        )
    }

    return (
        <Modal
            title='Only for premium users'
            description='Listen to music to spotify premium'
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    )
}

export default SubscribeModal