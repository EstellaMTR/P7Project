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

            .nav-button:hover {
                background-color: #3A4237;
            }

            #exit-button {
                position: absolute;
                left: 0;
                text-align: center;
            }

            header {
                position: sticky;
                top: 0;
                width: 100%;
                padding: 0;
                margin: 0;
            } 

            .fast-exit {
                background-color: var(--bg-exit);
                color: var(--text-dark);
                border: none;
                border-radius: 0px 0px 12px;
                width: 80px;
                height: 80px;
                font-size: 3rem;
                font-weight: 300;
                line-height: 48px;
                text-align: center;
                cursor: pointer;
                transition: transform 0.2s ease, background-color 0.2s ease;
            }

            #exit-button {
                color: white;
            }

            .fast-exit:hover {
                transform: scale(1.1);
                background-color: #d88a81;
            }

            .pro-login {
                background-color: #B3AC75;
                color: var(--text-dark);
                border-radius: 0px 0px 0px 16px;
                text-align: center;
                height: 80px;
            }

            #login-button {
                position: absolute;
                right: 0;
                color: var(--text-dark); 
                font-weight: 500;
                transition: transform 0.2s ease, background-color 0.2s ease;
            }

            #login-button:hover{
                background-color: #C3BC85;
                border-radius: 0px 0px 0px 16px;
                transform: scale(1.1);
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
                    <button class="fast-exit" id="exit-button" aria-label="Fast Exit"><i class="fa-solid fa-xmark"></i></button>
                    <li class="nav-button"><a href='/'><i class="fa-solid fa-house"></i><br>Home</a></li>
                    <li class="nav-button"><a href='/chat'><i class="fa-solid fa-comments"></i><br>Chat</a></li>
                    <li class="nav-button"><a href='/resources'><i class="fa-solid fa-sitemap"></i><br>Resources</a></li>
                    <li class="nav-button"><a href='/articleOverview'><i class="fa-solid fa-lightbulb"></i><br>Articles</a></li>
                    <li class="nav-button"><a href='/storyOverview'><i class="fa-solid fa-heart"></i><br>Stories</a></li>
                    <li id="login-button" class="pro-login"><a href='/login'><i class="fa-solid fa-user"></i><br><p>Professional<br>Login</p></a></li>
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

    window.customElements.define("custom-header", CustomHeader);
 // --- Fast Exit Function ---
    function performFastExit(event) {
        event.preventDefault();
        location.replace('https://www.google.com');
    }

   
    // In your fast exit function:
    function performFastExit(event) {
        event.preventDefault();

        // Replace current history entry with an external site
        window.location.replace('https://www.google.com');
    }


    // --- Attach click listener to all fast-exit buttons ---
    const fastExitButtons = document.querySelectorAll('.fast-exit');
    fastExitButtons.forEach(button => {
        button.addEventListener('click', performFastExit);
    });

    // --- Attach ESC key listener ---
    document.addEventListener('keydown', (event) => {
        const active = document.activeElement;
        if (event.key === 'Escape' && active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA') {
            performFastExit(event);
        }
    });
});
