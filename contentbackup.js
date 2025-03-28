
console.log('Running on:', window.location.href);
document.body.style.border = '5px solid red';


(function() {
    function waitForButtons() {
        let replyButton = document.querySelector('[data-testid="reply"]');
        if (replyButton) {
            console.log('Initial Reply button found:', replyButton);
            replyButton.click();
            console.log('Initial Reply button clicked!');

            setTimeout(() => {
                let agreeButton = document.querySelector('[data-mood="agree"]');
                if (agreeButton) {
                    console.log(' Agree button found:', agreeButton);
                    agreeButton.click();
                    console.log(' Agree button clicked!');

                    setTimeout(() => {
                        let postButton = document.querySelector('[data-testid="tweetButton"]');
                        if (postButton) {
                            console.log('Post Reply button found:', postButton);
                            postButton.click();
                            console.log('Post Reply button clicked!');

                            // Wait 30 seconds, then refresh and restart
                            setTimeout(() => {
                                console.log('Waiting 30 seconds, then refreshing...');
                                location.reload();
                                // The script will restart automatically after reload due to content script injection
                            }, 30000 + Math.random() * 30000); // 60-90s (1 min + 0-30s)
                        } else {
                            console.log('Post Reply button not found after 10 seconds.');
                        }
                    }, 10000); // Wait 10 seconds for Post
                } else {
                    console.log(' Agree button not found after 1 second.');
               
                }
            }, 1000); // Wait 1 second for Agree
        } else {
            console.log('Initial Reply button not found yet, waiting...');
            setTimeout(waitForButtons, 500); // Retry every 500ms
     
        }
    }
    // Start the process
    waitForButtons();
})();

