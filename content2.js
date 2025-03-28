(function() {
    if (window.hasRun) return;
    window.hasRun = true;

    let runCount = localStorage.getItem('runCount') || 0;
    if (runCount >= 5000) {
        console.log('Max 5 runs reached, stopping.');
        return;
    }

    function waitForButtons() {
        let replyAttempts = 0;
        const maxReplyTime = Date.now() + 120000; // 2 minutes timeout

        function tryReply() {
            if (Date.now() > maxReplyTime) {
                console.log('Failsafe: Reply button not found after 2 minutes, reloading...');
                location.reload();
                return;
            }

            let replyButton = document.querySelector('[data-testid="reply"]');
            if (replyButton) {
                console.log('Initial Reply button found:', replyButton);
                replyButton.dispatchEvent(new Event('click', { bubbles: true }));
                console.log('Initial Reply button clicked!');

                let agreeAttempts = 0;
                const maxAgreeTime = Date.now() + 120000; // 2 minutes timeout

                setTimeout(() => {
                    function tryAgree() {
                        if (Date.now() > maxAgreeTime) {
                            console.log('Failsafe: Agree button not found after 2 minutes, reloading...');
                            location.reload();
                            return;
                        }

                        let agreeButton = document.querySelector('[data-mood="agree"]');
                        if (agreeButton) {
                            console.log(' Agree button found:', agreeButton);
                            agreeButton.dispatchEvent(new Event('click', { bubbles: true }));
                            console.log(' Agree button clicked! (AI reply triggered)');

                            let postAttempts = 0;
                            const maxPostTime = Date.now() + 120000; // 2 minutes timeout

                            setTimeout(() => {
                                function tryPost() {
                                    if (Date.now() > maxPostTime) {
                                        console.log('Failsafe: Post button not found after 2 minutes, reloading...');
                                        location.reload();
                                        return;
                                    }

                                    let postButton = document.querySelector('[data-testid="tweetButton"]');
                                    if (postButton) {
                                        console.log('Post Reply button found:', postButton);
                                        postButton.dispatchEvent(new Event('click', { bubbles: true }));
                                        console.log('Post Reply button clicked!');

                                        setTimeout(() => {
                                            console.log('Waiting 1 minute plus random seconds, then refreshing...');
                                            localStorage.setItem('runCount', ++runCount);
                                            location.reload();
                                        }, 60000 + Math.random() * 30000); // 60-90s
                                    } else {
                                        console.log('Post Reply button not found yet, attempt', postAttempts + 1);
                                        postAttempts++;
                                        setTimeout(tryPost, 500);
                                    }
                                }
                                tryPost();
                            }, 60000 + Math.random() * 30000); // 60-90s
                        } else {
                            console.log(' Agree button not found yet, attempt', agreeAttempts + 1);
                            agreeAttempts++;
                            setTimeout(tryAgree, 500);
                        }
                    }
                    tryAgree();
                }, 60000 + Math.random() * 30000); // 60-90s
            } else {
                console.log('Initial Reply button not found yet, attempt', replyAttempts + 1);
                replyAttempts++;
                setTimeout(tryReply, 500);
            }
        }
        tryReply();
    }

    waitForButtons();
})();