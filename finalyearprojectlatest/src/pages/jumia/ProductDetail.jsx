import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { usePrivacy } from '../../context/PrivacyContext';
import { API_URL } from '../../config';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { addLog } = usePrivacy();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_URL}/products`);
                const found = res.data.find(p => p._id === id);

                setProduct(found);

                if (found) {
                    addLog(
                        'PRODUCT_DEEP_VIEW',
                        `User viewing full details for ${found.name}`,
                        'LOW'
                    );
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div
                style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: 'var(--crm-text)',
                }}
            >
                Loading Product Details...
            </div>
        );
    }

    if (!product) {
        return (
            <div
                style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: 'var(--crm-text)',
                }}
            >
                Product not found.
            </div>
        );
    }

    return (
        <div
            className="flex"
            style={{
                gap: '20px',
                padding: '20px 0',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
            }}
        >
            {/* Product Image */}
            <div
                style={{
                    flex: '1 1 350px',
                    backgroundColor: 'var(--crm-card)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid var(--crm-border)',
                }}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        maxWidth: '100%',
                        borderRadius: '8px',
                    }}
                />
            </div>

            {/* Product Info */}
            <div
                style={{
                    flex: '1.5 1 450px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'var(--crm-card)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid var(--crm-border)',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            marginBottom: '10px',
                            color: 'var(--crm-text)',
                        }}
                    >
                        {product.name}
                    </h1>

                    <div
                        className="flex align-center gap-10"
                        style={{
                            borderBottom: '1px solid var(--crm-border)',
                            paddingBottom: '10px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <span style={{ color: '#f68b1e' }}>★★★★☆</span>

                        <span
                            style={{
                                fontSize: '13px',
                                color: '#f68b1e',
                            }}
                        >
                            ({product.reviews} ratings)
                        </span>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <p
                            style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: 'var(--crm-text)',
                            }}
                        >
                            ₦ {product.price.toLocaleString()}
                        </p>

                        <p
                            style={{
                                fontSize: '14px',
                                color: 'var(--crm-text-light)',
                                textDecoration: 'line-through',
                            }}
                        >
                            ₦ {product.oldPrice.toLocaleString()}
                        </p>

                        <span
                            style={{
                                backgroundColor: '#feefde',
                                color: '#f68b1e',
                                fontSize: '12px',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                display: 'inline-block',
                                marginTop: '5px',
                            }}
                        >
                            -{product.discount}%
                        </span>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        style={{
                            backgroundColor: '#f68b1e',
                            color: '#fff',
                            width: '100%',
                            padding: '15px',
                            borderRadius: '8px',
                            marginTop: '20px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            fontSize: '15px',
                        }}
                    >
                        <ShoppingCart size={20} />
                        ADD TO CART
                    </button>
                </div>

                {/* Product Details */}
                <div
                    style={{
                        backgroundColor: 'var(--crm-card)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid var(--crm-border)',
                    }}
                >
                    <h4
                        style={{
                            marginBottom: '10px',
                            color: 'var(--crm-text)',
                        }}
                    >
                        PRODUCT DETAILS
                    </h4>

                    <p
                        style={{
                            fontSize: '14px',
                            color: 'var(--crm-text)',
                            lineHeight: '1.7',
                        }}
                    >
                        This is a high-quality product perfect for your daily
                        needs. It features premium materials and exceptional
                        durability.
                    </p>
                </div>
            </div>

            {/* Delivery Info */}
            <div
                style={{
                    flex: '0.8 1 280px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'var(--crm-card)',
                        borderRadius: '12px',
                        padding: '15px',
                        border: '1px solid var(--crm-border)',
                    }}
                >
                    <h4
                        style={{
                            fontSize: '12px',
                            marginBottom: '10px',
                            color: 'var(--crm-text)',
                        }}
                    >
                        DELIVERY & RETURNS
                    </h4>

                    <div
                        style={{
                            fontSize: '12px',
                            borderBottom: '1px solid var(--crm-border)',
                            paddingBottom: '10px',
                            color: 'var(--crm-text)',
                        }}
                    >
                        <strong>
                            Ecommerce{' '}
                            <span style={{ color: '#38bdf8' }}>
                                Express
                            </span>
                        </strong>

                        <p
                            style={{
                                color: 'var(--crm-text-light)',
                                marginTop: '4px',
                            }}
                        >
                            Free delivery on thousands of products.
                        </p>
                    </div>

                    <div
                        style={{
                            fontSize: '12px',
                            marginTop: '10px',
                            color: 'var(--crm-text)',
                        }}
                    >
                        <strong>Choose Location</strong>

                        <select
                            style={{
                                width: '100%',
                                marginTop: '8px',
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid var(--input-border)',
                                backgroundColor: 'var(--input-bg)',
                                color: 'var(--crm-text)',
                                outline: 'none',
                            }}
                        >
                            <option>Lagos</option>
                            <option>Abuja</option>
                            <option>Port Harcourt</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;