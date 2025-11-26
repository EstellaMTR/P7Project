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

            #login-button {
                position: absolute;
                right: 0;
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
                    <li class="nav-button"><a href='/'><i class="fa-solid fa-house"></i><br>Home</a></li>
                    <li class="nav-button"><a href='/resources'><i class="fa-solid fa-sitemap"></i><br>Resources</a></li>
                    <li class="nav-button"><a href='/articleOverview'><i class="fa-solid fa-lightbulb"></i><br>Articles</a></li>
                    <li class="nav-button"><a href='/storyOverview'><i class="fa-solid fa-heart"></i><br>Stories</a></li>
                </ul>
            </nav> 
        </header>
    `;

    class VolunteerHeader extends HTMLElement {
        constructor() {
            super();
            const clone = template.content.cloneNode(true);
            this.appendChild(clone);
        }
    }

    window.customElements.define("volunteer-header", VolunteerHeader);
 
});
