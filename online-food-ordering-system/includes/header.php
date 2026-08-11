<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' - ' : ''; ?>Online Food Ordering System</title>
    <link rel="stylesheet" href="<?php echo SITE_URL; ?>assets/css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <a href="<?php echo SITE_URL; ?>"><h1>FoodOrder</h1></a>
            </div>
            <ul class="nav-links">
                <li><a href="<?php echo SITE_URL; ?>">Home</a></li>
                <li><a href="<?php echo SITE_URL; ?>user/menu.php">Menu</a></li>
                <li><a href="<?php echo SITE_URL; ?>user/cart.php">Cart (<?php echo isset($_SESSION['cart']) ? count($_SESSION['cart']) : 0; ?>)</a></li>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <li><a href="<?php echo SITE_URL; ?>user/profile.php">Profile</a></li>
                    <li><a href="<?php echo SITE_URL; ?>user/logout.php">Logout</a></li>
                <?php else: ?>
                    <li><a href="<?php echo SITE_URL; ?>user/login.php">Login</a></li>
                    <li><a href="<?php echo SITE_URL; ?>user/register.php">Register</a></li>
                <?php endif; ?>
            </ul>
        </nav>
    </header>
    <main>