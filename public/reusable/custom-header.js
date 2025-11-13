document.addEventListener("DOMContentLoaded", () => {
    const template = document.createElement("template");

template.innerHTML = `
    <style>
        * {
            letter-spacing: normal;
            font-weight: 500;
        }

        .nav-bar {
            list-style-type: none;
            margin: 0;
            padding: 0;
            background-color: #51604B;
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .nav-bar li a {
            display: block;
            color: white;
            padding: 14px 16px;
            text-decoration: none;
            text-align: center;
        }

        .nav-bar li a:hover {
            background-color: #3A4237;
        }

        #exit-button {
            position: absolute;
            left: 0;
            text-align: center;
        }

        #login-button {
            position: absolute;
            right: 0;
        }

        
        header {
            width: 100%;
            padding: 0;
            margin: 0;
        } 

        .fast-exit {
            // display: flex;
            // justify-content: space-between;
            // align-items: flex-start; 
            // padding: 1.5rem 2rem; 
            background-color: var(--bg-exit);
            color: var(--text-dark);
            border: none;
            border-radius: 12px;
            width: 80px;
            height: 80px;
            font-size: 2rem;
            font-weight: 300;
            line-height: 48px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .fast-exit:hover {
            transform: scale(1.1);
            background-color: #d88a81;
        }

        .pro-login {
            background-color: var(--bg-pro-login);
            color: var(--text-light);
            // padding: 0.75rem 1.5rem; 
            border-radius: 16px;
            text-align: center;
        }

        #login-button {
            position: absolute;
            right: 0;
            font-weight: 500;
        }

        #login-button :hover {
            border-radius: 16px;
            background-color: #3c4055ff;
        }

        .pro-login p {
            margin: 0;
            font-size: 0.65rem;
        }

        .pro-login a {
            font-weight: 500;
            text-decoration: underline;
            font-size: 0.65rem;
        }


    </style>



    <header>
        <nav>
            <ul class="nav-bar">
                <button class="fast-exit" id="exit-button" aria-label="Fast Exit">x</button>
                <li><a href='/public/index.html'><i class="fa-solid fa-house"></i><br>Home</a></li>
                <li><a href='/public/users/chat/chat.html'><i class="fa-solid fa-comments"></i><br>Chat</a></li>
                <li><a href="/public/resources/resources.html"><i class="fa-solid fa-sitemap"></i><br>Resources</a></li>
                <li><a href="/public/articles/articles.html"><i class="fa-solid fa-lightbulb"></i><br>Articles</a></li>
                <li><a href="/public/stories/stories.html"><i class="fa-solid fa-heart"></i><br>Stories</a></li>
                <li id="login-button" class="pro-login"><a href="/public/volunteers/login/login.html"><i class="fa-solid fa-user"></i><br><p>Here as a professional?<br>Log in to chat</p></a></li>
            </ul>
        </nav> 
    </header>
`;

class CustomHeader extends HTMLElement {
    constructor() {
        super();

        const clone = template.content.cloneNode(true);
        this.appendChild(clone);
    }
}

window.customElements.define("custom-header", CustomHeader)
});
