from flask import Flask, request, jsonify
import requests
import uuid

app = Flask(__name__)

BASE_URL = "http://20.244.56.144/test/companies"
COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"]
MAX_PRODUCTS_PER_PAGE = 10

# In-memory cache to store product details for quick lookup
product_cache = {}

def fetch_products_from_company(company, category, top, min_price, max_price):
    url = f"{BASE_URL}/{company}/categories/{category}/products"
    params = {
        "top": top,
        "minPrice": min_price,
        "maxPrice": max_price
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def generate_unique_id(product):
    product_id = str(uuid.uuid4())
    product_cache[product_id] = product
    return product_id

@app.route('/categories/<string:category>/products', methods=['GET'])
def get_top_products(category):
    try:
        n = int(request.args.get('n', 10))
        min_price = request.args.get('minPrice', 0)
        max_price = request.args.get('maxPrice', float('inf'))
        page = int(request.args.get('page', 1))
        sort_by = request.args.get('sortBy')
        sort_order = request.args.get('sortOrder', 'asc')

        all_products = []

        for company in COMPANIES:
            products = fetch_products_from_company(company, category, n, min_price, max_price)
            for product in products:
                product['company'] = company
                product['id'] = generate_unique_id(product)
                all_products.append(product)

        # Sort products if sort_by is specified
        if sort_by:
            reverse = (sort_order == 'desc')
            all_products.sort(key=lambda x: x[sort_by], reverse=reverse)

        # Pagination
        start = (page - 1) * n
        end = start + n
        paginated_products = all_products[start:end]

        return jsonify(paginated_products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/categories/<string:category>/products/<string:product_id>', methods=['GET'])
def get_product_details(category, product_id):
    try:
        product = product_cache.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(product)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
