import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePrivacy } from '../../context/PrivacyContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const JumiaHome = () => {
    const { addLog } = usePrivacy();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API_URL}/products`);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        const interactionData = {
            productId: product._id,
            action: 'VIEW_DETAILS',
            meta: `User viewed ${product.name}`
        };

        addLog(
            'PRODUCT_INTERACTION',
            JSON.stringify(interactionData),
            'LOW'
        );

        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();

        addToCart(product);

        addLog(
            'CART_ADDITION',
            `Added ${product.name} to cart`,
            'LOW'
        );
    };

    const categories = [
        'Supermarket',
        'Health & Beauty',
        'Home & Office',
        'Phones & Tablets',
        'Computing',
        'Electronics',
        'Fashion',
        'Baby Products',
        'Gaming',
        'Sporting Goods',
        'Automobile'
    ];

    const filteredProducts = selectedCategory
        ? products.filter(
            p =>
                p.category?.toLowerCase() ===
                selectedCategory.toLowerCase()
        )
        : products;

    if (loading) {
        return (
            <div
                style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: 'var(--crm-text)'
                }}
            >
                Loading Store...
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            {/* HERO SECTION */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'minmax(180px, 220px) 1fr minmax(220px, 260px)',
                    gap: '20px'
                }}
            >
                {/* Categories */}
                <div
                    style={{
                        backgroundColor: 'var(--crm-card)',
                        padding: '15px 10px',
                        borderRadius: '12px',
                        border: '1px solid var(--crm-border)',
                        color: 'var(--crm-text)',
                        overflowY: 'auto',
                        minHeight: '380px'
                    }}
                >
                    <h4
                        style={{
                            fontSize: '14px',
                            marginBottom: '12px',
                            fontWeight: '700',
                            borderBottom:
                                '1px solid var(--crm-border)',
                            paddingBottom: '8px'
                        }}
                    >
                        Categories
                    </h4>

                    <ul
                        style={{
                            fontSize: '13px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}
                    >
                        <li
                            onClick={() => setSelectedCategory(null)}
                            style={{
                                padding: '8px 10px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                backgroundColor:
                                    selectedCategory === null
                                        ? '#f68b1e'
                                        : 'transparent',
                                color:
                                    selectedCategory === null
                                        ? '#fff'
                                        : 'var(--crm-text)',
                                fontWeight:
                                    selectedCategory === null
                                        ? '700'
                                        : '500',
                                transition: 'var(--transition)'
                            }}
                        >
                            All Products
                        </li>

                        {categories.map(cat => (
                            <li
                                key={cat}
                                onClick={() =>
                                    setSelectedCategory(cat)
                                }
                                style={{
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor:
                                        selectedCategory === cat
                                            ? '#f68b1e'
                                            : 'transparent',
                                    color:
                                        selectedCategory === cat
                                            ? '#fff'
                                            : 'var(--crm-text)',
                                    fontWeight:
                                        selectedCategory === cat
                                            ? '700'
                                            : '500',
                                    transition: 'var(--transition)'
                                }}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Hero Banner */}
                <div
                    style={{
                        backgroundColor: 'var(--crm-card)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid var(--crm-border)',
                        minHeight: '380px'
                    }}
                >
                    <img
                        src="https://picsum.photos/seed/jumia-hero/1200/700"
                        alt="Hero Banner"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />

                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            color: '#fff',
                            textShadow:
                                '0 2px 6px rgba(0,0,0,0.5)',
                            maxWidth: '80%'
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 'clamp(24px, 4vw, 40px)',
                                fontWeight: '700',
                                marginBottom: '10px'
                            }}
                            className="outfit-font"
                        >
                            Flash Sales! Up to 50% Off
                        </h1>

                        <p
                            style={{
                                fontSize: '15px'
                            }}
                        >
                            Shop the best deals today.
                        </p>
                    </div>
                </div>

                {/* Promo Column */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}
                >
                    {[
                        {
                            title: 'HELP CENTER',
                            text: 'Guide to customer care'
                        },
                        {
                            title: 'EASY RETURN',
                            text: 'Up to 15 days'
                        },
                        {
                            title: 'SELL WITH US',
                            text: 'Fast track your business'
                        }
                    ].map((promo, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor:
                                    'var(--crm-card)',
                                flex: 1,
                                borderRadius: '12px',
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                border:
                                    '1px solid var(--crm-border)',
                                color: 'var(--crm-text)'
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: '#f68b1e',
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    flexShrink: 0
                                }}
                            />

                            <div
                                style={{
                                    fontSize: '12px'
                                }}
                            >
                                <strong>{promo.title}</strong>

                                <p
                                    style={{
                                        color:
                                            'var(--crm-text-light)',
                                        marginTop: '4px'
                                    }}
                                >
                                    {promo.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCTS */}
            <section
                style={{
                    backgroundColor: 'var(--crm-card)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid var(--crm-border)',
                    color: 'var(--crm-text)'
                }}
            >
                <div
                    className="flex align-center justify-between"
                    style={{
                        borderBottom:
                            '1px solid var(--crm-border)',
                        paddingBottom: '12px',
                        marginBottom: '20px',
                        gap: '10px',
                        flexWrap: 'wrap'
                    }}
                >
                    <h3
                        style={{
                            color: '#f68b1e',
                            fontSize: '24px',
                            fontWeight: '700'
                        }}
                        className="outfit-font"
                    >
                        {selectedCategory || 'All Products'}
                    </h3>

                    {filteredProducts.length > 0 && (
                        <span
                            style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                color: 'var(--crm-text-light)'
                            }}
                        >
                            {filteredProducts.length} Items Found
                        </span>
                    )}
                </div>

                {filteredProducts.length === 0 ? (
                    <div
                        style={{
                            padding: '40px',
                            textAlign: 'center',
                            color: 'var(--crm-text-light)'
                        }}
                    >
                        No products available in this category yet.
                    </div>
                ) : (
                    <div className="grid-products">
                        {filteredProducts.map(product => (
                            <div
                                key={product._id}
                                onClick={() =>
                                    handleProductClick(product)
                                }
                                style={{
                                    backgroundColor:
                                        'var(--crm-bg)',
                                    border:
                                        '1px solid var(--crm-border)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    transition:
                                        'var(--transition)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative'
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '1 / 1',
                                            objectFit: 'cover',
                                            borderRadius: '10px'
                                        }}
                                    />

                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            backgroundColor:
                                                '#feefde',
                                            color: '#f68b1e',
                                            padding: '4px 8px',
                                            fontSize: '10px',
                                            fontWeight: '700',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        -{product.discount}%
                                    </span>
                                </div>

                                <div
                                    style={{
                                        marginTop: '12px',
                                        flex: 1
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: '14px',
                                            color:
                                                'var(--crm-text)',
                                            overflow: 'hidden',
                                            textOverflow:
                                                'ellipsis',
                                            display:
                                                '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient:
                                                'vertical',
                                            minHeight: '42px'
                                        }}
                                    >
                                        {product.name}
                                    </p>

                                    <p
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            marginTop: '8px',
                                            color:
                                                'var(--crm-text)'
                                        }}
                                    >
                                        ₦{' '}
                                        {Number(
                                            product.price
                                        ).toLocaleString()}
                                    </p>

                                    <p
                                        style={{
                                            fontSize: '13px',
                                            color:
                                                'var(--crm-text-light)',
                                            textDecoration:
                                                'line-through'
                                        }}
                                    >
                                        ₦{' '}
                                        {Number(
                                            product.oldPrice
                                        ).toLocaleString()}
                                    </p>

                                    <div
                                        className="flex align-center gap-10"
                                        style={{
                                            marginTop: '10px'
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: '#f68b1e'
                                            }}
                                        >
                                            ★
                                        </span>

                                        <span
                                            style={{
                                                fontSize: '12px',
                                                color:
                                                    'var(--crm-text-light)'
                                            }}
                                        >
                                            ({product.reviews})
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) =>
                                        handleAddToCart(
                                            e,
                                            product
                                        )
                                    }
                                    style={{
                                        marginTop: '15px',
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor:
                                            '#f68b1e',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition:
                                            'var(--transition)'
                                    }}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default JumiaHome;