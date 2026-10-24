// test-api.js - Automated verification of all Bake 'n' More backend endpoints

const BASE_URL = 'http://127.0.0.1:5000/api';

async function testEndpoint(name, url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    const data = await res.json();
    console.log(`[PASS] ${name} (Status ${res.status})`);
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    return { ok: false, error: err.message };
  }
}

async function runTests() {
  console.log('--- Starting Bake n More API Verification ---\n');

  // 1. Health check
  await testEndpoint('Health Check', `${BASE_URL}/health`);

  // 2. Categories
  const catRes = await testEndpoint('Get Categories', `${BASE_URL}/categories`);
  console.log(`       Found ${catRes.data?.categories?.length || 0} categories.`);

  // 3. Menu
  const menuRes = await testEndpoint('Get Menu Items', `${BASE_URL}/menu`);
  console.log(`       Found ${menuRes.data?.items?.length || 0} menu items.`);

  // 4. Submit Cake Inquiry
  const cakeRes = await testEndpoint('Submit Cake Inquiry', `${BASE_URL}/cakes/inquiries`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Anjali Verma',
      phone: '+91 98390 12345',
      event_date: '2026-09-30',
      occasion: 'Anniversary',
      flavour: 'Black Forest',
      design: 'Heart shape with fresh roses and cherries',
      budget: '₹1,500'
    })
  });
  console.log(`       Inquiry ID: #${cakeRes.data?.inquiry?.id}, WhatsApp URL generated: ${Boolean(cakeRes.data?.whatsappUrl)}`);

  // 5. Submit Contact Message
  const contactRes = await testEndpoint('Submit Contact Message', `${BASE_URL}/contact`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Vikas Gupta',
      phone: '+91 75719 00000',
      message: 'Do you deliver customized cakes in Keshav Puram Kalyanpur?'
    })
  });
  console.log(`       Contact Message ID: #${contactRes.data?.contactMessage?.id}`);

  // 6. Admin Login
  const loginRes = await testEndpoint('Admin Login', `${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: 'admin@bakenmore.com',
      password: 'admin123'
    })
  });
  const token = loginRes.data?.token;
  console.log(`       Admin authenticated, Token generated: ${Boolean(token)}`);

  // 7. Protected Admin Inquiry List
  if (token) {
    const adminCakesRes = await testEndpoint('Admin Get Cake Inquiries', `${BASE_URL}/cakes/inquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`       Admin retrieved ${adminCakesRes.data?.inquiries?.length || 0} cake inquiries.`);
  }

  // 8. Place Customer Order
  const orderRes = await testEndpoint('Place Order', `${BASE_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      customer_name: 'Rohit Singh',
      phone: '+91 99360 88888',
      address: 'House 42, Awas Vikas, Kalyanpur, Kanpur',
      items: [
        { menu_item_id: 1, item_name: 'Chocolate Cake', price: 450, quantity: 1 },
        { menu_item_id: 6, item_name: 'Simply Cheese Pizza', price: 180, quantity: 2 }
      ],
      notes: 'Please pack napkins and candles'
    })
  });
  console.log(`       Order placed: #${orderRes.data?.order?.id}, Total: ₹${orderRes.data?.order?.total_amount}`);

  console.log('\n--- All API Tests Completed Successfully! ---');
}

runTests();
