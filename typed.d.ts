export interface Rating {
    rate: number;
    count: number;
}

export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface BasketType extends ProductType {
    count: number
    hasPrime: boolean
    rate: number
}

export interface OrderType {
    id: string
    amount: number
    amountShipping: number
    images: string[]
    timestamp: number
    items: Items
}

export interface Items {
    object: string
    data: Data[]
    has_more: boolean
    url: string
}

export interface Data {
    id: string;
    object: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    price: Price;
    quantity: number;
}

export interface Price {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null;
    livemode: boolean;
    lookup_key: null;
    metadata: Metadata;
    nickname: null;
    product: string;
    recurring: null;
    tax_behavior: string;
    tiers_mode: null;
    transform_quantity: null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
}

export interface Metadata {
}