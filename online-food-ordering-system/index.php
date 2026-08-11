<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Food Ordering System</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <h1>FoodOrder</h1>
            </div>
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="user/menu.php">Menu</a></li>
                <li><a href="user/cart.php">Cart</a></li>
                <li><a href="user/login.php">Login</a></li>
                <li><a href="user/register.php">Register</a></li>
            </ul>
        </nav>
    </header>
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to Online Food Ordering System</h1>
            <p>Order your favorite food from the comfort of your home</p>
            <a href="user/menu.php" class="btn">Browse Menu</a>
        </div>
    </section>
    <section class="features">
        <h2>Why Choose Us?</h2>
        <div class="feature-grid">
            <div class="feature-card">
                <h3>Easy Ordering</h3>
                <p>Browse menus and place orders with just a few clicks</p>
            </div>
            <div class="feature-card">
                <h3>Real-Time Tracking</h3>
                <p>Track your order from preparation to delivery</p>
            </div>
            <div class="feature-card">
                <h3>Wide Selection</h3>
                <p>Choose from a variety of restaurants and cuisines</p>
            </div>
        </div>
    </section>
    <?php include 'includes/footer.php'; ?>
    <script src="assets/js/main.js"></script>
</body>
</html>