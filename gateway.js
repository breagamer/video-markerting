<script type="text/javascript">
    var cookieExpireTime = 300000; // 5 minutos
    var applyCookieSiteWide = true;

    function getCookie(name) {
        let cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) {
                return value;
            }
        }
        return null;
    }

    function setCookie(name, value, expireTime) {
        let expireDate = new Date(Date.now() + expireTime).toUTCString();
        let path = applyCookieSiteWide ? "path=/" : `path=${window.location.pathname}`;
        document.cookie = `${name}=${value}; expires=${expireDate}; ${path}`;
    }

    function shouldShowGateway() {
        return getCookie("tpgwcc") === null; // Mostrar solo si la cookie no existe
    }

    function isMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) ||
            (window.innerWidth <= 768); // Alternativa basada en ancho de pantalla
    }

    var referrer = document.referrer;
    var urlParams = new URLSearchParams(window.location.search);
    var isFromFacebook = referrer.includes("facebook.com");
    var isFromWhatsApp = urlParams.get("source") === "whatsapp";

    if (true) {
        if (shouldShowGateway()) {
            var tpGatewayBackground = document.createElement("div");
            tpGatewayBackground.setAttribute("id", "tp-gateway-background");
            tpGatewayBackground.setAttribute("class", "tp-gateway-background");

            var tpGateway = document.createElement("div");
            tpGateway.setAttribute("id", "tp-gateway");
            tpGateway.setAttribute("class", "tp-gateway");

            var videoContainer = document.createElement("div");
            videoContainer.setAttribute("id", "video-container");

            var videoImage = document.createElement("img");
            videoImage.setAttribute("id", "video-image");
            videoImage.setAttribute("src", "https://i.postimg.cc/qqjBtRpf/2287718w.png");

            var loadingSpinner = document.createElement("div");
            loadingSpinner.setAttribute("id", "loading-spinner");

            var loadingText = document.createElement("div");
            loadingText.setAttribute("id", "loading-text");
            loadingText.textContent = "Cargando video... Espere...";

            videoContainer.appendChild(videoImage);
            videoContainer.appendChild(loadingSpinner);
            videoContainer.appendChild(loadingText);

            tpGateway.appendChild(videoContainer);

            var gatewayURL = new URL(window.location.href);
            gatewayURL.searchParams.append("expand_article", "1");

            var tpGatewayButton = document.createElement("a");
            tpGatewayButton.setAttribute("id", "tp-gateway-button");
            tpGatewayButton.setAttribute("class", "tp-gateway-button");
            tpGatewayButton.textContent = "Ver video";
            tpGatewayButton.style.display = "none";
            tpGatewayButton.style.backgroundColor = "#FF0000"; // Color rojo de YouTube
            tpGatewayButton.setAttribute("href", gatewayURL.href);

            var playButton = document.createElement("img");
            playButton.setAttribute("id", "play-button");
            playButton.setAttribute("src", "https://i.postimg.cc/T3y2wfSS/2287718.png");
            playButton.style.position = "absolute";
            playButton.style.top = "50%";
            playButton.style.left = "50%";
            playButton.style.transform = "translate(-50%, -50%)";
            playButton.style.display = "none";

            var speedUpButton = document.createElement("button");
            speedUpButton.setAttribute("id", "speed-up-button");
            speedUpButton.textContent = "Acelerar espera";
            speedUpButton.style.display = "block";

            speedUpButton.onclick = function () {
                const currentScroll = window.scrollY;
                const maxScroll = document.body.scrollHeight - window.innerHeight;

                if (currentScroll < maxScroll - 100) {
                    window.scrollTo({
                        top: Math.min(currentScroll + (maxScroll / 3), maxScroll),
                        behavior: "smooth",
                    });
                } else {
                    speedUpButton.style.display = "none";
                }
            };

            videoContainer.appendChild(playButton);
            tpGateway.appendChild(tpGatewayButton);
            tpGateway.appendChild(speedUpButton);

            document.body.insertBefore(tpGateway, document.body.firstChild);
            document.body.insertBefore(tpGatewayBackground, document.body.firstChild);

            setTimeout(function () {
                loadingSpinner.style.display = "none";
                loadingText.style.display = "none";
                playButton.style.display = "block";
                tpGatewayButton.style.display = "block";
                speedUpButton.style.display = "none"; // Ocultar "Acelerar espera"
            }, 30000);

            tpGatewayButton.onclick = function () {
                setCookie("tpgwcc", "1", cookieExpireTime);
            };

            playButton.onclick = function () {
                playButton.style.display = "none";
                tpGatewayButton.style.display = "block";
            };
        } else {
            console.log("Gateway oculto debido a la cookie existente.");
        }
    } else {
        console.log("Este script no se ejecuta en PC o el usuario no proviene de Facebook/WhatsApp.");
    }
</script>
