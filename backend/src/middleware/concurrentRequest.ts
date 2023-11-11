let activeRequests = 0;
const maxConcurrentRequests = 2;
const pendingRequests: (() => void)[] = [];

export const concurrencyMiddleware = (req: any, res: any, next: any) => {
    const processNextRequest = () => {
        if (pendingRequests.length === 0 || activeRequests >= maxConcurrentRequests) {
            return;
        }
        activeRequests++;
        console.log('Added request, activeRequests', activeRequests);
        const nextRequest = pendingRequests.shift();
        nextRequest!();
    };

    const currentRequest = () => {
        next();
        res.on('finish', () => {
            activeRequests--;
            console.log('Finished request, activeRequests', activeRequests);
            processNextRequest();
        });
    };

    if (activeRequests >= maxConcurrentRequests) {
        console.log("Reached max concurrent requests, adding to pending requests");
        pendingRequests.push(currentRequest);
    } else {
        activeRequests++;
        console.log('Added request, added activeRequests', activeRequests);
        currentRequest();
    }
};
