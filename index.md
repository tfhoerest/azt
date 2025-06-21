---
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ site.title }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
            color: #1a1a1a;
            background-color: #fff;
            font-weight: 400;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            border-bottom: 1px solid #e0e0e0;
            padding: 20px 0;
            margin-bottom: 40px;
        }
        
        .site-title {
            font-size: 2.2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
            color: #000;
        }
        
        .site-title a {
            color: #000;
            text-decoration: none;
        }
        
        nav {
            text-align: center;
        }
        
        nav ul {
            list-style: none;
            display: inline-flex;
            gap: 40px;
        }
        
        nav a {
            color: #666;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            text-transform: none;
            letter-spacing: 0.3px;
            transition: color 0.2s ease;
            padding: 8px 12px;
            border-radius: 2px;
        }
        
        nav a:hover,
        nav a.active {
            color: #000;
        }
        
        .intro {
            text-align: center;
            margin: 60px 0;
            padding: 40px 0;
        }
        
        .intro h1 {
            font-size: 2.4rem;
            margin-bottom: 20px;
            font-weight: 700;
        }
        
        .intro p {
            font-size: 1.2rem;
            color: #555;
            max-width: 600px;
            margin: 0 auto 30px;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin: 60px 0;
        }
        
        .feature {
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
        }
        
        .feature h3 {
            font-size: 1.3rem;
            margin-bottom: 15px;
            color: #000;
        }
        
        .feature p {
            color: #666;
            line-height: 1.6;
        }
        
        footer {
            border-top: 1px solid #e0e0e0;
            padding: 40px 0;
            text-align: center;
            color: #666;
            margin-top: 60px;
        }
        
        @media (max-width: 768px) {
            nav ul {
                flex-direction: column;
                gap: 20px;
            }
            
            .intro h1 {
                font-size: 2rem;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1 class="site-title">
                <a href="{{ site.baseurl }}/">{{ site.title }}</a>
            </h1>
            <nav>
                <ul>
                    <li><a href="{{ site.baseurl }}/" class=
