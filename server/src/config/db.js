import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
const hasPostgres = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '');

let pool = null;

// Local JSON Storage for zero-dependency local development
const dataDir = path.join(__dirname, '../../data');
const storePath = path.join(dataDir, 'store.json');

const initialSeedData = {
  users: [
    {
      id: 1,
      name: 'Bake n More Admin',
      email: 'admin@bakenmore.com',
      password_hash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      created_at: new Date().toISOString(),
    }
  ],
  categories: [
    { id: 1, name: 'Cakes', slug: 'cakes', sort_order: 1, is_active: true },
    { id: 2, name: 'Pastries', slug: 'pastries', sort_order: 2, is_active: true },
    { id: 3, name: 'Pizzas', slug: 'pizzas', sort_order: 3, is_active: true },
    { id: 4, name: 'Burgers & Rolls', slug: 'burgers', sort_order: 4, is_active: true },
    { id: 5, name: 'Sandwiches', slug: 'sandwiches', sort_order: 5, is_active: true },
    { id: 6, name: 'Noodles & South Indian', slug: 'noodles-south-indian', sort_order: 6, is_active: true },
    { id: 7, name: 'Combos & Offers', slug: 'combos', sort_order: 7, is_active: true },
  ],
  menu_items: [
    {
      id: 1,
      category_id: 1,
      name: 'Chocolate Cake',
      description: 'Rich decadent chocolate sponge layered with smooth chocolate ganache and chocolate shavings.',
      price: 'Price on request',
      image_url: '/assets/menu_cake.jpg',
      is_available: true,
      is_featured: true,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      category_id: 1,
      name: 'Strawberry Cake',
      description: 'Delicate vanilla sponge infused with fresh strawberry compote and light whipped cream.',
      price: 'Price on request',
      image_url: '/assets/menu_strawberry_cake.jpg',
      is_available: true,
      is_featured: false,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      category_id: 1,
      name: 'Black Forest Cake',
      description: 'Classic layers of chocolate sponge, whipped vanilla cream, dark cherries and chocolate flakes.',
      price: 'Price on request',
      image_url: '/assets/menu_black_forest_cake.jpg',
      is_available: true,
      is_featured: true,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      category_id: 2,
      name: 'Butterscotch Pastry',
      description: 'Soft vanilla sponge layered with caramelized butterscotch praline and rich cream.',
      price: 'Price on request',
      image_url: '/assets/menu_butterscotch_pastry.jpg',
      is_available: true,
      is_featured: true,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 5,
      category_id: 2,
      name: 'Choco Chip Pastry',
      description: 'Loaded with premium dark chocolate chips, creamy chocolate mousse and fudge drizzle.',
      price: 'Price on request',
      image_url: '/assets/menu_pastry.jpg',
      is_available: true,
      is_featured: false,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 6,
      category_id: 3,
      name: 'Simply Cheese Pizza',
      description: 'Melted golden mozzarella cheese on our house-made tomato sauce and hand-tossed crust.',
      price: 'Price on request',
      image_url: '/assets/menu_pizza.jpg',
      is_available: true,
      is_featured: true,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 7,
      category_id: 3,
      name: 'Bake N More Special Pizza',
      description: 'Chef special loaded with crisp bell peppers, sweet corn, paneer cubes, olives and herbs.',
      price: 'Price on request',
      image_url: '/assets/bakery_food_assortment.jpg',
      is_available: true,
      is_featured: true,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 8,
      category_id: 4,
      name: 'Veg Cheese Burger',
      description: 'Crisp seasoned vegetable patty topped with melted cheese, fresh tomato, onion and tangy café sauce.',
      price: 'Price on request',
      image_url: '/assets/menu_burger.jpg',
      is_available: true,
      is_featured: true,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 9,
      category_id: 6,
      name: 'Masala Dosa',
      description: 'Crisp golden rice-lentil crepe wrapped around spiced potato masala, served with sambhar and chutneys.',
      price: 'Price on request',
      image_url: '/assets/menu_south_indian.jpg',
      is_available: true,
      is_featured: true,
      is_veg: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  cake_inquiries: [
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      event_date: '2026-09-25',
      occasion: 'Birthday',
      flavour: 'Chocolate Truffle',
      design: '2-tier superhero theme with fondant accents',
      budget: '₹1,500 - ₹2,500',
      status: 'new',
      notes: 'Customer requested eggless confirmation',
      created_at: new Date().toISOString()
    }
  ],
  orders: [],
  order_items: [],
  contact_messages: []
};

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure store file exists
if (!fs.existsSync(storePath)) {
  fs.writeFileSync(storePath, JSON.stringify(initialSeedData, null, 2), 'utf-8');
}

function getStore() {
  try {
    const raw = fs.readFileSync(storePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return initialSeedData;
  }
}

function saveStore(data) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf-8');
}

if (hasPostgres) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  console.log('🔗 Connecting to PostgreSQL database...');
} else {
  console.log('📁 Running with local JSON database store at server/data/store.json (Set DATABASE_URL to connect to PostgreSQL)');
}

export const db = {
  isPostgres: hasPostgres,

  async getTable(tableName) {
    if (hasPostgres) {
      const res = await pool.query(`SELECT * FROM ${tableName} ORDER BY id ASC`);
      return res.rows;
    }
    const store = getStore();
    return store[tableName] || [];
  },

  async insert(tableName, record) {
    if (hasPostgres) {
      const keys = Object.keys(record);
      const values = Object.values(record);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
      const res = await pool.query(sql, values);
      return res.rows[0];
    }
    const store = getStore();
    if (!store[tableName]) store[tableName] = [];
    const newId = store[tableName].length > 0 
      ? Math.max(...store[tableName].map(r => r.id || 0)) + 1 
      : 1;
    const newRecord = {
      id: newId,
      ...record,
      created_at: record.created_at || new Date().toISOString()
    };
    store[tableName].push(newRecord);
    saveStore(store);
    return newRecord;
  },

  async update(tableName, id, updates) {
    const numericId = Number(id);
    if (hasPostgres) {
      const keys = Object.keys(updates);
      const values = Object.values(updates);
      const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
      const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
      const res = await pool.query(sql, [...values, numericId]);
      return res.rows[0] || null;
    }
    const store = getStore();
    const list = store[tableName] || [];
    const index = list.findIndex(r => r.id === numericId);
    if (index === -1) return null;
    list[index] = {
      ...list[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    saveStore(store);
    return list[index];
  },

  async delete(tableName, id) {
    const numericId = Number(id);
    if (hasPostgres) {
      const res = await pool.query(`DELETE FROM ${tableName} WHERE id = $1 RETURNING *`, [numericId]);
      return res.rows[0] || null;
    }
    const store = getStore();
    const list = store[tableName] || [];
    const index = list.findIndex(r => r.id === numericId);
    if (index === -1) return null;
    const [deleted] = list.splice(index, 1);
    saveStore(store);
    return deleted;
  },

  async findById(tableName, id) {
    const numericId = Number(id);
    if (hasPostgres) {
      const res = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [numericId]);
      return res.rows[0] || null;
    }
    const store = getStore();
    const list = store[tableName] || [];
    return list.find(r => r.id === numericId) || null;
  },

  async findByField(tableName, field, value) {
    if (hasPostgres) {
      const res = await pool.query(`SELECT * FROM ${tableName} WHERE ${field} = $1`, [value]);
      return res.rows;
    }
    const store = getStore();
    const list = store[tableName] || [];
    return list.filter(r => r[field] === value);
  }
};
