'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Define types for our menu items and cart
type MenuItem = {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image: string;
};

type CartItem = MenuItem & { quantity: number };

// Sample menu data with image URLs
const menuItems: MenuItem[] = [
	{
		id: '1',
		name: 'Martini',
		description: 'Classic cocktail',
		price: 1200,
		category: 'Drinks',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '2',
		name: 'Old Fashioned',
		description: 'Whiskey-based cocktail',
		price: 1400,
		category: 'Drinks',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '3',
		name: 'Grilled Chicken',
		description: 'Herb-marinated chicken breast',
		price: 18000,
		category: 'Proteins',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '4',
		name: 'Salmon Fillet',
		description: 'Pan-seared Atlantic salmon',
		price: 22000,
		category: 'Proteins',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '5',
		name: 'Truffle Fries',
		description: 'Crispy fries with truffle oil',
		price: 8000,
		category: 'Sides',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '6',
		name: 'Caesar Salad',
		description: 'Classic Caesar with homemade dressing',
		price: 10000,
		category: 'Sides',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '7',
		name: 'Martini',
		description: 'Classic cocktail',
		price: 1200,
		category: 'Drinks',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '8',
		name: 'Grilled Chicken',
		description: 'Herb-marinated chicken breast',
		price: 18000,
		category: 'Proteins',
		image: '/placeholder.png?height=200&width=200',
	},
	{
		id: '9',
		name: 'Caesar Salad',
		description: 'Classic Caesar with homemade dressing',
		price: 10000,
		category: 'Sides',
		image: '/placeholder.png?height=200&width=200',
	},
];

export default function Component() {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (item: MenuItem) => {
		setCart((currentCart) => {
			const existingItem = currentCart.find(
				(cartItem) => cartItem.id === item.id
			);
			if (existingItem) {
				return currentCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			}
			return [...currentCart, { ...item, quantity: 1 }];
		});
	};

	const removeFromCart = (itemId: string) => {
		setCart((currentCart) => {
			const existingItem = currentCart.find(
				(item) => item.id === itemId
			);
			if (existingItem && existingItem.quantity > 1) {
				return currentCart.map((item) =>
					item.id === itemId
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			}
			return currentCart.filter((item) => item.id !== itemId);
		});
	};

	const getTotalPrice = () => {
		return cart.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	const groupedMenuItems = menuItems.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {} as Record<string, MenuItem[]>);

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Lounge Menu</h1>

			{Object.entries(groupedMenuItems).map(([category, items]) => (
				<div
					key={category}
					className='mb-8'
				>
					<h2 className='text-2xl font-semibold mb-4'>
						{category}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{items.map((item) => (
							<Card
								key={item.id}
								className='overflow-hidden'
							>
								<CardContent className='p-0'>
									<Image
										src={item.image}
										alt={item.name}
										width={400}
										height={200}
										className='w-full h-48 object-cover'
									/>
								</CardContent>
								<CardHeader>
									<CardTitle>{item.name}</CardTitle>
									<CardDescription>
										{item.description}
									</CardDescription>
								</CardHeader>
								<CardFooter className='flex justify-between'>
									<span className='text-lg font-semibold'>
										₦{item.price.toFixed(2)}
									</span>
									<Button
										onClick={() =>
											addToCart(item)
										}
									>
										Add to Cart
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			))}

			<Sheet>
				<SheetTrigger asChild>
					<Button className='fixed bottom-4 right-4 z-10'>
						<ShoppingCart className='mr-2 h-4 w-4' /> View
						Cart (
						{cart.reduce(
							(sum, item) => sum + item.quantity,
							0
						)}
						)
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Your Cart</SheetTitle>
						<SheetDescription>
							Review your items and checkout
						</SheetDescription>
					</SheetHeader>
					<div className='mt-8'>
						{cart.map((item) => (
							<div
								key={item.id}
								className='flex justify-between items-center mb-4'
							>
								<div className='flex items-center'>
									<Image
										src={item.image}
										alt={item.name}
										width={50}
										height={50}
										className='rounded-md mr-4'
									/>
									<div>
										<h3 className='font-semibold'>
											{item.name}
										</h3>
										<p className='text-sm text-gray-500'>
											₦{item.price.toFixed(2)}{' '}
											x {item.quantity}
										</p>
									</div>
								</div>
								<div className='flex items-center'>
									<Button
										variant='outline'
										size='icon'
										onClick={() =>
											removeFromCart(item.id)
										}
									>
										<Minus className='h-4 w-4' />
									</Button>
									<span className='mx-2'>
										{item.quantity}
									</span>
									<Button
										variant='outline'
										size='icon'
										onClick={() =>
											addToCart(item)
										}
									>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
							</div>
						))}
					</div>
					<Separator className='my-4' />
					<div className='flex justify-between items-center mb-4'>
						<span className='font-semibold'>Total:</span>
						<span className='font-semibold'>
							₦{getTotalPrice().toFixed(2)}
						</span>
					</div>
					<Button className='w-full'>Checkout</Button>
				</SheetContent>
			</Sheet>
		</div>
	);
}
