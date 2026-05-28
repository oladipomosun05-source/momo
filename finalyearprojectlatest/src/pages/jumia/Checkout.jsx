import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { usePrivacy } from '../../context/PrivacyContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, CreditCard, Truck } from 'lucide-react';

import { API_URL } from '../../config';

export default function Checkout() {
    const { cart, totalItems, totalPrice, clearCart } = useCart();
    const { activeUser } = usePrivacy();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [savedCards, setSavedCards] = useState([]);
    const [useSavedCard, setUseSavedCard] = useState('');

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        saveCard: false
    });

    useEffect(() => {
        if (!activeUser.email) {
            alert('Security Requirement: Please log in or create an account to access the Secure Checkout.');
            navigate('/login');
        } else {
            const token = localStorage.getItem('token');

            axios.get(`${API_URL}/user/cards`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setSavedCards(res.data))
                .catch(err => console.error("Could not fetch cards", err));
        }
    }, [activeUser, navigate]);

    if (totalItems === 0) {
        return (
            <div
                className="flex flex-column align-center justify-center"
                style={{
                    minHeight: '60vh',
                    textAlign: 'center',
                    padding: '20px',
                    color: 'var(--crm-text)'
                }}
            >
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        marginBottom: '20px'
                    }}
                >
                    Your cart is empty
                </h2>

                <button
                    onClick={() => navigate('/')}
                    style={{
                        backgroundColor: '#f68b1e',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: 'bold'
                    }}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!activeUser.email) {
            alert('Please login to complete your checkout.');
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        try {
            const token = localStorage.getItem('token');

            let payload = {
                ...formData,
                items: cart.map(item => item._id),
                total: totalPrice,
                event: 'ECOMMERCE_CHECKOUT'
            };

            if (useSavedCard) {
                payload.paymentToken = useSavedCard;
                payload.cardNumber = savedCards.find(
                    c => c.token === useSavedCard
                )?.maskedNumber;
            }

            await axios.post(`${API_URL}/checkout`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'x-user-role': activeUser.role,
                    'x-user-name': activeUser.name
                }
            });

            alert('Payment Successful! Data secured by the Privacy Framework.');

            clearCart();
            navigate('/');

        } catch (err) {
            alert('Checkout failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '30px 20px',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'flex-start'
            }}
        >
            {/* Checkout Form */}
            <div
                style={{
                    flex: '1 1 650px',
                    minWidth: '300px'
                }}
            >
                <h1
                    style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'var(--crm-text)',
                        flexWrap: 'wrap'
                    }}
                >
                    <Lock size={24} color="#10b981" />
                    Secure Checkout
                </h1>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    {/* Delivery Info */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitle}>
                            <Truck size={18} />
                            Delivery Information
                        </h2>

                        <div
                            style={{
                                display: 'grid',
                                gap: '15px'
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Full Delivery Address"
                                required
                                value={formData.address}
                                onChange={e =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value
                                    })
                                }
                                style={inputStyle}
                            />

                            <div
                                style={{
                                    display: 'flex',
                                    gap: '15px',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="City / State"
                                    required
                                    value={formData.city}
                                    onChange={e =>
                                        setFormData({
                                            ...formData,
                                            city: e.target.value
                                        })
                                    }
                                    style={{
                                        ...inputStyle,
                                        flex: '1 1 250px'
                                    }}
                                />

                                <input
                                    type="tel"
                                    placeholder="Receiver's Phone"
                                    required
                                    value={formData.phone}
                                    onChange={e =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value
                                        })
                                    }
                                    style={{
                                        ...inputStyle,
                                        flex: '1 1 250px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitle}>
                            <CreditCard size={18} />
                            Payment & Billing
                        </h2>

                        {savedCards.length > 0 && (
                            <div
                                style={{
                                    marginBottom: '20px',
                                    padding: '15px',
                                    backgroundColor: 'var(--crm-bg)',
                                    borderRadius: '10px',
                                    border: '1px solid var(--crm-border)'
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        marginBottom: '12px',
                                        color: 'var(--crm-text)'
                                    }}
                                >
                                    Use a Saved Card
                                </p>

                                {savedCards.map(card => (
                                    <label
                                        key={card.token}
                                        style={radioStyle}
                                    >
                                        <input
                                            type="radio"
                                            name="savedCard"
                                            value={card.token}
                                            checked={useSavedCard === card.token}
                                            onChange={(e) =>
                                                setUseSavedCard(e.target.value)
                                            }
                                        />

                                        <span
                                            style={{
                                                fontFamily: 'monospace',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {card.maskedNumber}
                                        </span>

                                        <span
                                            style={{
                                                fontSize: '12px',
                                                color: 'var(--crm-text-light)'
                                            }}
                                        >
                                            Exp: {card.expiry}
                                        </span>
                                    </label>
                                ))}

                                <label
                                    style={{
                                        ...radioStyle,
                                        marginTop: '12px',
                                        borderTop:
                                            '1px solid var(--crm-border)',
                                        paddingTop: '12px'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="savedCard"
                                        value=""
                                        checked={useSavedCard === ''}
                                        onChange={(e) =>
                                            setUseSavedCard(e.target.value)
                                        }
                                    />

                                    <span
                                        style={{
                                            fontSize: '13px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        Enter a new card
                                    </span>
                                </label>
                            </div>
                        )}

                        {!useSavedCard && (
                            <>
                                <div
                                    style={{
                                        display: 'grid',
                                        gap: '15px'
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Card Number (16 Digits)"
                                        required={!useSavedCard}
                                        value={formData.cardNumber}
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                cardNumber: e.target.value
                                            })
                                        }
                                        style={inputStyle}
                                    />

                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '15px',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            required={!useSavedCard}
                                            value={formData.expiry}
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    expiry: e.target.value
                                                })
                                            }
                                            style={{
                                                ...inputStyle,
                                                flex: '1 1 150px'
                                            }}
                                        />

                                        <input
                                            type="password"
                                            placeholder="CVV"
                                            required={!useSavedCard}
                                            value={formData.cvv}
                                            onChange={e =>
                                                setFormData({
                                                    ...formData,
                                                    cvv: e.target.value
                                                })
                                            }
                                            style={{
                                                ...inputStyle,
                                                flex: '1 1 150px'
                                            }}
                                        />
                                    </div>
                                </div>

                                <label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginTop: '15px',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        color: 'var(--crm-text)',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.saveCard}
                                        onChange={e =>
                                            setFormData({
                                                ...formData,
                                                saveCard: e.target.checked
                                            })
                                        }
                                    />

                                    Save this card securely for future purchases
                                </label>
                            </>
                        )}

                        <p
                            style={{
                                fontSize: '11px',
                                color: 'var(--crm-text-light)',
                                marginTop: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Lock size={12} />

                            {useSavedCard
                                ? 'Using secure payment token.'
                                : 'Your payment data is actively masked by our Advanced Privacy Framework before being stored.'}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        style={{
                            backgroundColor: '#f68b1e',
                            color: '#fff',
                            padding: '15px',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '16px',
                            border: 'none',
                            cursor: isProcessing
                                ? 'not-allowed'
                                : 'pointer',
                            width: '100%'
                        }}
                    >
                        {isProcessing
                            ? 'Processing Securely...'
                            : `Pay ₦${totalPrice.toLocaleString()}`}
                    </button>
                </form>
            </div>

            {/* Order Summary */}
            <div
                style={{
                    flex: '1 1 320px',
                    minWidth: '280px',
                    backgroundColor: 'var(--crm-card)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid var(--crm-border)',
                    height: 'fit-content',
                    color: 'var(--crm-text)'
                }}
            >
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        borderBottom: '1px solid var(--crm-border)',
                        paddingBottom: '10px',
                        marginBottom: '15px'
                    }}
                >
                    Order Summary
                </h3>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginBottom: '20px'
                    }}
                >
                    {cart.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '10px',
                                fontSize: '14px'
                            }}
                        >
                            <span
                                style={{
                                    color: 'var(--crm-text-light)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {item.name}
                            </span>

                            <span
                                style={{
                                    fontWeight: '700',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                ₦{item.price.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        borderTop: '1px solid var(--crm-border)',
                        paddingTop: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '700',
                        fontSize: '18px'
                    }}
                >
                    <span>Total</span>

                    <span style={{ color: '#f68b1e' }}>
                        ₦{totalPrice.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    backgroundColor: 'var(--crm-card)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid var(--crm-border)',
    color: 'var(--crm-text)'
};

const sectionTitle = {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderBottom: '1px solid var(--crm-border)',
    paddingBottom: '10px',
    color: 'var(--crm-text)',
    flexWrap: 'wrap'
};

const radioStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
    cursor: 'pointer',
    flexWrap: 'wrap',
    color: 'var(--crm-text)'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid var(--crm-border)',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--crm-text)'
};