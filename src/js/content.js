function process() {
    if (window.location["href"].includes("watch")) {
        setTimeout(() => {
            function getButton() {
                if (document.getElementById("menu-container")?.offsetParent === null) {
                    return document.querySelector("ytd-menu-renderer.ytd-watch-metadata > div");
                } else {
                    return document
                        .getElementById("menu-container")
                        ?.querySelector("#top-level-buttons-computed");
                }
            }

            const likeButt = getButton().children[0];
            const likeText = likeButt.querySelector("a > yt-formatted-string").ariaLabel;
            // may need isVideoLiked -- like may == 0 👉 later
            const likeValue = parseInt(likeText.split(" ")[0].split(",").join(""));

            const viewText = document.querySelector(".view-count.style-scope.ytd-video-view-count-renderer");
            const viewValue = parseInt(viewText.innerText.split(" ")[0].split(",").join(""));

            const ratio = Math.round((likeValue / viewValue * 100) * 100) / 100;

            const viewCountAndDateField = document.querySelector("#info-text.style-scope.ytd-video-primary-info-renderer");

            const newlyCreatedField = document.querySelector(".im-the-odd-one");
            if (newlyCreatedField) {
                newlyCreatedField.innerHTML = `• Likes/Views: ${ratio}%`
            } else {
                viewCountAndDateField.insertAdjacentHTML("beforeend", `
                    <div id="info-strings" class="style-scope ytd-video-primary-info-renderer im-the-odd-one">
                    • Likes/Views: ${ratio}%</div>`);
            }
        }, 200)
    }
}

document.addEventListener("yt-navigate-finish", process);