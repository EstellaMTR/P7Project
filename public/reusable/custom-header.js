document.addEventListener("DOMContentLoaded", () => {
    const template = document.createElement("template");

template.innerHTML = `
    <style>
        .nav-bar {
            /* Remove bullets, margin and padding from list element. Source: W3 Schools */
            list-style-type: none;
            margin: 0;
            padding: 0;
        
            /*formatting*/
            background-color: #51604B;
            display: flex;
            justify-content: center;
            // position: ;
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
            margin-left: 8px;
            margin-bottom: 12px;
            text-align: center;
            background-color: #fa0000b7;
        }

        #exit-button a:hover {
            background-color: #44020268;
        }

        #login-button {
            position: absolute;
            right: 0;
        }

    </style>

    <nav>
        <ul class="nav-bar">
            <li id="exit-button"><a href=""><i class="fa-solid fa-circle-xmark"></i><br>Exit</a></li>
            <li><a href='/public/index.html'><i class="fa-solid fa-house"></i><br>Home</a></li>
            <li><a href='/public/users/chat/chat.html'><i class="fa-solid fa-comments"></i><br>Chat</a></li>
            <li><a href="/public/resources/resources.html"><i class="fa-solid fa-sitemap"></i><br>Resources</a></li>
            <li><a href="/public/users/info/info.html"><i class="fa-solid fa-lightbulb"></i><br>Articles</a></li>
            <li><a href="/public/resources/resources.html"><i class="fa-solid fa-heart"></i><br>Stories</a></li>
            <li id="login-button"><a href="/public/users/profile/profile.html"><i class="fa-solid fa-user"></i><br>Volunteer Login</a></li>
        </ul>
    </nav> 
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
