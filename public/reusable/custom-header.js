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
            // position: ;
        }

        .nav-bar li a {
            display: block;
            color: white;
            padding: 14px 16px;
            text-decoration: none;
        }

        .nav-bar li a:hover {
            background-color: #3A4237;
        }
    </style>

    <nav>
        <ul class="nav-bar">
            <li><a href="">Exit</a></li>
            <li><a href='/public/index.html'>Home</a></li>
            <li><a href='/public/users/chat/chat.html'>Chat</a></li>
            <li><a href="/public/resources/resources.html">Resources</a></li>
            <li><a href="/public/users/info/info.html">Articles</a></li>
            <li><a href="/public/resources/resources.html">Stories</a></li>
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
