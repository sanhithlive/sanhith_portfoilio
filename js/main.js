/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className
    
    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        
        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
})

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
    }
})


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

document.addEventListener("DOMContentLoaded", () => {
    const githubStarsElements = document.querySelectorAll(".github-stars");

    githubStarsElements.forEach(element => {
        const repo = element.getAttribute("data-repo");
        const starsCountElement = element.querySelector(".stars-count");

        if (repo) {
            fetch(`https://api.github.com/repos/${repo}`)
                .then(response => response.json())
                .then(data => {
                    const starCount = data.stargazers_count || 0;
                    starsCountElement.textContent = starCount;
                })
                .catch(error => {
                    console.error(`Error fetching stars for ${repo}:`, error);
                    starsCountElement.textContent = "N/A";
                });
        } else {
            starsCountElement.textContent = "N/A";
        }
    });
});

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    let scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== CHAT WIDGET ====================*/
function toggleChat() {
    const widget = document.getElementById('chat-widget');
    widget.style.display = widget.style.display === 'flex' ? 'none' : 'flex';
    widget.style.flexDirection = 'column';
}

// Portfolio Knowledge Base - All data from the website
const portfolioData = {
    personal: {
        name: "Sanhith Thikkavarapu",
        title: "Data Science & AI Engineer",
        email: "sanhithreddy5131@gmail.com",
        location: ["Hyderabad, India", "Chennai, India"],
        github: "https://github.com/sanhith30",
        linkedin: "https://www.linkedin.com/in/sanhith30/",
        twitter: "https://twitter.com/Sanhithreddy30"
    },
    
    about: "With 6 months of experience in ML, I design, develop, and deploy cutting-edge AI solutions across MedTech, NLP, and Computer Vision domains. My work focuses on production-ready systems that deliver measurable impact.",
    
    experience: [
        {
            role: "Data Science Intern",
            company: "NUNC Systems",
            period: "Aug 2025 - Present",
            type: "Current"
        },
        {
            role: "Junior Data Analyst",
            company: "Pantech.AI",
            period: "May 2025 - Jul 2025",
            type: "Previous"
        }
    ],
    
    education: [
        {
            degree: "B.Tech - Computer Science Engineering",
            institution: "Saveetha School Of Engineering, Chennai",
            period: "2023 - 2027"
        }
    ],
    
    skills: {
        "Data Science & AI": ["Computer Vision", "Generative AI", "Natural Language Processing", "Signal Processing", "Probability & Statistics", "Data Analytics & Visualization"],
        "Programming": ["Python", "SQL", "C++/C", "Java"],
        "Computing": ["GPU & Distributed Computing", "Amazon Web Services", "Google Cloud Platform", "Microsoft Azure"],
        "Tools": ["Git", "GitHub"]
    },
    
    currentlyLearning: ["LangChain & LangGraph", "Multi-Agent Systems", "RAG Architectures", "MLOps & Model Deployment"],
    
    projects: [
        {
            name: "Oral Ulcer AI App",
            description: "Deep learning app that detects and classifies oral ulcers from images for early, accessible health screening",
            tech: ["Python", "TensorFlow", "Deep Learning", "OpenCV"],
            live: "https://sanhith30.github.io/Sanhith_PDD_app/",
            github: "https://github.com/Sanhith30/Sanhith_PDD_app",
            featured: true
        },
        {
            name: "Multi-Agent Chatbot",
            description: "LLM-orchestrated system where specialized agents collaborate to plan, retrieve, and respond to complex queries",
            tech: ["LangChain", "Python", "GPT-4", "Vector DB"],
            github: "https://github.com/Sanhith30/Multi-agent_chatbot",
            featured: true
        },
        {
            name: "House Price Prediction App",
            description: "Regression model deployed on Streamlit Cloud, providing real-time Hyderabad house price estimates",
            tech: ["Python", "Scikit-learn", "Streamlit", "Pandas"],
            live: "https://hyderabad-house-price.streamlit.app/",
            github: "https://github.com/Sanhith30/Hyderabad-House-Price-Prediction",
            featured: true
        },
        {
            name: "Blinkit Sales Data",
            description: "End-to-end analysis with Python, SQL, Power BI, and Excel to uncover sales insights",
            tech: ["Python", "SQL", "Power BI", "Excel"],
            github: "https://github.com/Sanhith30/Blinkit-Sales-Data",
            featured: true
        },
        {
            name: "Sunny AI Meeting Intelligence",
            description: "AI meeting assistant that transcribes, summarizes, and extracts action items from conversations in real time",
            tech: ["NLP", "Speech-to-Text", "Python", "LLM"],
            github: "https://github.com/Sanhith30/sunny-ai-meeting-intelligence",
            featured: true
        },
        {
            name: "RideSense AI Dashboard",
            description: "Interactive analytics dashboard surfacing Uber ride trends, demand patterns, and pricing insights",
            tech: ["Python", "Pandas", "Plotly", "Streamlit"],
            github: "https://github.com/Sanhith30/ridesense-ai-uber-analytics-dashboard",
            featured: true
        },
        {
            name: "Summarization Platform",
            description: "End-to-end NLP/LLM platform that condenses long documents into concise, accurate summaries",
            tech: ["NLP", "Transformers", "BART/T5", "Python"],
            github: "https://github.com/Sanhith30/summarization-platform",
            featured: true
        },
        {
            name: "Customer Churn Prediction",
            description: "Built ML models to predict customer churn using classification techniques",
            tech: ["Python", "Scikit-learn", "ML"],
            github: "https://github.com/Sanhith30/Data-Science-And-ML-Projects"
        },
        {
            name: "Netflix Recommendation System",
            description: "Built a movie recommendation engine using collaborative & content-based filtering",
            tech: ["Python", "ML", "Recommendation Systems"],
            github: "https://github.com/Sanhith30/netflix-recommendation-system"
        },
        {
            name: "Fake News Detection",
            description: "Developed an NLP pipeline with TF-IDF & ML models to classify fake vs. real news articles",
            tech: ["NLP", "Python", "TF-IDF", "ML"],
            github: "https://github.com/Sanhith30/Data-Science-And-ML-Projects"
        },
        {
            name: "Customer Segmentation",
            description: "Performed clustering (K-Means) on mall dataset to segment customers by income & spending patterns",
            tech: ["Python", "K-Means", "Clustering"],
            github: "https://github.com/Sanhith30/Data-Science-And-ML-Projects"
        },
        {
            name: "EDA on Meteorological Data",
            description: "Conducted exploratory data analysis on meteorological data to uncover patterns and trends",
            tech: ["Python", "Pandas", "Visualization"],
            github: "https://github.com/Sanhith30/EDA-on-Meteorological-Data"
        },
        {
            name: "Quora Duplicate Question Detection",
            description: "NLP project to detect duplicate questions using feature engineering & ML classifiers",
            tech: ["NLP", "Python", "ML"],
            github: "https://github.com/Sanhith30/Data-Science-And-ML-Projects"
        }
    ],
    
    stats: {
        experience: "06 Months",
        projects: "10+",
        companies: "02"
    }
};

// Intelligent Question Matching
function findAnswer(question) {
    const q = question.toLowerCase();
    
    // Contact & Personal Info
    if (q.match(/\b(email|mail|contact|reach|message)\b/i)) {
        return `You can reach me at <a href="mailto:${portfolioData.personal.email}" style="color: var(--first-color);">${portfolioData.personal.email}</a> or use the contact form on this page!`;
    }
    
    if (q.match(/\b(linkedin|connect)\b/i)) {
        return `Connect with me on LinkedIn: <a href="${portfolioData.personal.linkedin}" target="_blank" style="color: var(--first-color);">linkedin.com/in/sanhith30</a>`;
    }
    
    if (q.match(/\b(github|code|repository|repos)\b/i)) {
        return `Check out my GitHub: <a href="${portfolioData.personal.github}" target="_blank" style="color: var(--first-color);">github.com/sanhith30</a> with ${portfolioData.stats.projects} projects!`;
    }
    
    if (q.match(/\b(location|where|based|from|live)\b/i)) {
        return `I'm based in ${portfolioData.personal.location.join(' and ')}.`;
    }
    
    if (q.match(/\b(resume|cv|download)\b/i)) {
        return `You can download my resume using the "Download Resume" button in the navigation or About section!`;
    }
    
    // Experience & Work
    if (q.match(/\b(work|job|experience|currently|current|working)\b/i)) {
        const current = portfolioData.experience[0];
        return `I'm currently working as a ${current.role} at ${current.company} (${current.period}). Previously, I was a Junior Data Analyst at Pantech.AI.`;
    }
    
    if (q.match(/\b(company|companies|employer)\b/i)) {
        const companies = portfolioData.experience.map(e => e.company).join(', ');
        return `I've worked at ${portfolioData.stats.companies} companies: ${companies}.`;
    }
    
    // Education
    if (q.match(/\b(education|degree|study|studying|college|university|student)\b/i)) {
        const edu = portfolioData.education[0];
        return `I'm pursuing ${edu.degree} at ${edu.institution} (${edu.period}).`;
    }
    
    // Skills
    if (q.match(/\b(skill|skills|technology|technologies|tech stack|know)\b/i)) {
        const skillCategories = Object.keys(portfolioData.skills);
        return `My skills include: <strong>Data Science & AI</strong> (Computer Vision, NLP, Generative AI), <strong>Programming</strong> (Python, SQL, C++, Java), <strong>Cloud</strong> (AWS, GCP, Azure). Currently learning: ${portfolioData.currentlyLearning.join(', ')}.`;
    }
    
    if (q.match(/\b(python)\b/i)) {
        return `Yes! Python is my primary language. I use it for ML/AI with libraries like TensorFlow, PyTorch, Scikit-learn, Pandas, and more.`;
    }
    
    if (q.match(/\b(machine learning|ml|ai|artificial intelligence|deep learning)\b/i)) {
        return `I specialize in Machine Learning and AI! My focus areas are Computer Vision, NLP, Generative AI, and deploying production-ready ML systems. Check out my projects section for examples!`;
    }
    
    if (q.match(/\b(nlp|natural language|text|language)\b/i)) {
        return `I work extensively with NLP! Projects include: Fake News Detection, Quora Question Detection, Summarization Platform, and Multi-Agent Chatbot using LLMs.`;
    }
    
    if (q.match(/\b(computer vision|cv|image|object detection)\b/i)) {
        return `I have strong Computer Vision skills! My Oral Ulcer AI App uses deep learning for medical image classification. I work with TensorFlow, OpenCV, and CNNs.`;
    }
    
    if (q.match(/\b(learning|currently learning|studying now)\b/i)) {
        return `I'm currently exploring: ${portfolioData.currentlyLearning.join(', ')}. Always staying updated with the latest in AI!`;
    }
    
    // Projects - General
    if (q.match(/\b(project|projects|work|portfolio|built|build|made)\b/i)) {
        const featuredProjects = portfolioData.projects.filter(p => p.featured).slice(0, 3);
        let response = `I've built ${portfolioData.stats.projects} projects! Here are my top ones:<br><br>`;
        featuredProjects.forEach(p => {
            response += `<strong>${p.name}</strong> - ${p.description}`;
            if (p.live) response += ` <a href="${p.live}" target="_blank" style="color: var(--first-color);">[Live Demo]</a>`;
            response += `<br><br>`;
        });
        response += `Scroll down to see all projects!`;
        return response;
    }
    
    // Specific Projects
    if (q.match(/\b(oral|ulcer|medical|health|healthcare)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("Oral Ulcer"));
        return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.live}" target="_blank" style="color: var(--first-color);">Try Live Demo</a> | <a href="${project.github}" target="_blank" style="color: var(--first-color);">View Code</a>`;
    }
    
    if (q.match(/\b(chatbot|agent|multi-agent|llm|langchain)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("Multi-Agent"));
        return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.github}" target="_blank" style="color: var(--first-color);">View on GitHub</a>`;
    }
    
    if (q.match(/\b(house|price|prediction|real estate|property)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("House Price"));
        return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.live}" target="_blank" style="color: var(--first-color);">Try Live Demo</a>`;
    }
    
    if (q.match(/\b(blinkit|sales|analytics|dashboard|powerbi|power bi)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("Blinkit"));
        return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.github}" target="_blank" style="color: var(--first-color);">View on GitHub</a>`;
    }
    
    if (q.match(/\b(meeting|transcription|summarize|summary|summarization)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("Meeting") || p.name.includes("Summarization"));
        if (project) {
            return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.github}" target="_blank" style="color: var(--first-color);">View on GitHub</a>`;
        }
    }
    
    if (q.match(/\b(netflix|recommendation|recommender|movie)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("Netflix"));
        return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.github}" target="_blank" style="color: var(--first-color);">View on GitHub</a>`;
    }
    
    if (q.match(/\b(churn|customer churn|retention)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("Churn"));
        return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.github}" target="_blank" style="color: var(--first-color);">View on GitHub</a>`;
    }
    
    if (q.match(/\b(fake news|news|detection|classification)\b/i)) {
        const project = portfolioData.projects.find(p => p.name.includes("Fake News"));
        return `<strong>${project.name}:</strong> ${project.description}<br>Tech: ${project.tech.join(', ')}<br><a href="${project.github}" target="_blank" style="color: var(--first-color);">View on GitHub</a>`;
    }
    
    // About
    if (q.match(/\b(who|about|tell me|yourself|bio|introduction)\b/i)) {
        return `${portfolioData.about}<br><br>I have ${portfolioData.stats.experience} of experience and have worked at ${portfolioData.stats.companies} companies, building ${portfolioData.stats.projects} projects focused on Data Science, ML, and AI.`;
    }
    
    // Hiring & Availability
    if (q.match(/\b(hire|hiring|available|opportunity|job|position|open)\b/i)) {
        return `I'm currently a Data Science Intern at NUNC Systems and open to exciting opportunities! Feel free to reach out via the contact form or email me at ${portfolioData.personal.email}.`;
    }
    
    if (q.match(/\b(collaborate|collaboration|work together|partner)\b/i)) {
        return `I'd love to collaborate! Reach out through the contact form below or connect with me on <a href="${portfolioData.personal.linkedin}" target="_blank" style="color: var(--first-color);">LinkedIn</a>.`;
    }
    
    // Generic Greetings
    if (q.match(/\b(hi|hello|hey|greetings)\b/i)) {
        return `Hello! 👋 I'm Sanhith, a Data Science & AI Engineer. Ask me about my projects, skills, experience, or how to get in touch!`;
    }
    
    if (q.match(/\b(thanks|thank you|thx)\b/i)) {
        return `You're welcome! Feel free to ask anything else or use the contact form to get in touch. 😊`;
    }
    
    // Default - Help
    return `I can answer questions about:<br>
    • My <strong>projects</strong> (Oral Ulcer AI, Multi-Agent Chatbot, etc.)<br>
    • My <strong>skills</strong> (Python, ML, AI, NLP, Computer Vision)<br>
    • My <strong>experience</strong> (current role, previous work)<br>
    • <strong>Contact</strong> information (email, LinkedIn, GitHub)<br>
    • My <strong>education</strong> and what I'm currently <strong>learning</strong><br><br>
    Try asking: "Tell me about your projects" or "What are your skills?"`;
}

function askFAQ() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const question = input.value.trim();
    if (!question) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'text-align:right;margin:8px 0;padding:8px 12px;background:var(--first-color);color:white;border-radius:12px 12px 0 12px;max-width:80%;margin-left:auto;word-wrap:break-word;';
    userMsg.innerHTML = question;
    chatBox.appendChild(userMsg);

    // Show typing indicator
    const typingMsg = document.createElement('div');
    typingMsg.id = 'typing-indicator';
    typingMsg.style.cssText = 'text-align:left;margin:8px 0;padding:8px 12px;background:var(--input-color);color:var(--text-color);border-radius:12px 12px 12px 0;max-width:80%;';
    typingMsg.innerHTML = '<em>Typing...</em>';
    chatBox.appendChild(typingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate thinking delay
    setTimeout(() => {
        // Remove typing indicator
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
        
        // Get intelligent response
        const answer = findAnswer(question);
        
        // Append bot message
        const botMsg = document.createElement('div');
        botMsg.style.cssText = 'text-align:left;margin:8px 0;padding:8px 12px;background:var(--input-color);color:var(--text-color);border-radius:12px 12px 12px 0;max-width:80%;line-height:1.6;word-wrap:break-word;';
        botMsg.innerHTML = answer;
        chatBox.appendChild(botMsg);

        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
}

// Allow sending with Enter key
document.getElementById('user-input') && document.getElementById('user-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') askFAQ();
});



/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = 'Sending... <i class="uil uil-spinner-alt button__icon" style="animation: spin 1s linear infinite;"></i>';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            formStatus.textContent = '✗ Oops! There was a problem. Please email me directly at sanhithreddy5131@gmail.com';
            formStatus.className = 'form-status error';
        } finally {
            // Restore button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Hide status after 8 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }, 8000);
        }
    });
}
