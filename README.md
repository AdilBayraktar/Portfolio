# Adil Bayraktar - Portfolio

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features dark/light theme toggle, color customization, 3D animations, and professional design.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Color Customization**: Choose from 8 different color themes
- **3D Animations**: Interactive hover effects and smooth transitions
- **Particle Effects**: Animated background particles
- **Typing Animation**: Dynamic text animation in hero section
- **Form Validation**: Professional contact form with validation
- **PWA Ready**: Progressive Web App capabilities
- **Smooth Scrolling**: Seamless navigation between sections
- **Performance Optimized**: Fast loading and smooth animations

## 📱 Sections

1. **Hero Section**: Introduction with animated code display
2. **About**: Personal and professional information
3. **Services**: Offered services and expertise
4. **Skills**: Technical skills with animated progress bars
5. **Experience**: Professional timeline
6. **Projects**: Featured projects showcase
7. **Contact**: Contact form and information

## 🎨 Customization

### Color Themes

The portfolio includes 8 predefined color themes:

- Orange (Default): #f59e0b
- Blue: #3b82f6
- Purple: #8b5cf6
- Red: #ef4444
- Orange: #f59e0b
- Green: #10b981
- Pink: #ec4899
- Indigo: #6366f1

### Adding New Colors

To add new color themes, edit the `color-options` section in `index.html`:

```html
<div
  class="color-option"
  data-color="#your-color"
  style="background: #your-color;"
></div>
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Interactive functionality and animations
- **PHP**: Custom email backend system
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript functionality
├── send-email.php      # Custom email backend
├── sw.js              # Service Worker for PWA
├── manifest.json      # PWA manifest
└── README.md          # This file
```

## 🚀 Getting Started

1. **Clone or Download** the files to your local machine
2. **For Email Functionality**: Ensure your hosting supports PHP
3. **Open** `index.html` in a web browser
4. **Customize** the content, colors, and information as needed
5. **Deploy** to your preferred hosting service

### Server Requirements

- **PHP Support**: Required for email functionality
- **Web Server**: Apache, Nginx, or similar
- **Email Configuration**: SMTP settings may need adjustment

## 🌐 Deployment

### GitHub Pages

1. Upload files to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch and save

### Netlify

1. Drag and drop the folder to Netlify
2. Your site will be live instantly

### Vercel

1. Connect your GitHub repository
2. Deploy with one click

## 📧 Contact Form

The contact form features a **custom-built email system** that sends emails to:

- hello@adilbayraktar.com
- adilbayraktar1997@gmail.com

### Email System Features

- **Custom PHP Backend**: Built-in email handling with `send-email.php`
- **Form Validation**: Client-side and server-side validation
- **Success/Error Handling**: User feedback for form submissions
- **Security**: Basic spam protection and input sanitization
- **Responsive Design**: Works seamlessly across all devices

### Technical Implementation

The email system includes:

- `send-email.php` - Server-side email processing
- Form validation in `script.js`
- Success/error message handling
- Automatic form reset after successful submission

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile Support

- iOS Safari 12+
- Chrome Mobile 60+
- Samsung Internet 8+
- Firefox Mobile 55+

## 🎨 Customization Guide

### Changing Personal Information

1. Edit the hero section in `index.html`
2. Update the about section with your details
3. Modify experience and projects sections
4. Update contact information

### Modifying Colors

1. Use the built-in color picker
2. Or edit CSS variables in `style.css`
3. Update the manifest.json theme-color

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding CSS in `style.css`
3. Add navigation link in the navbar
4. Update JavaScript if needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📞 Support

For questions or support, contact:

- Email: hello@adilbayraktar.com
- LinkedIn: [linkedin.com/in/adilbayraktar/](https://linkedin.com/in/adilbayraktar/)
- Website: [adilbayraktar.com](https://adilbayraktar.com)

---

**Built with ❤️ by Adil Bayraktar**
