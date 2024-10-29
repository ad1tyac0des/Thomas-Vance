function scrollProgress() {
    const mainProgressContainer = document.querySelector('.main-progress-container')
    const progressContainer = document.querySelector('.progress-container')
    const progressElement = document.querySelector('.progress')
    let isDragging = false
    let startY

    lenis.on('scroll', ({progress}) => {
        progressElement.style.height = `${progress * 100}%`
    })

    // Add click functionality
    mainProgressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect()
        const clickY = e.clientY - rect.top
        const percentage = clickY / rect.height
        
        const targetScroll = percentage * lenis.limit
        
        lenis.scrollTo(targetScroll, {
            duration: 1.5,
        })
    })

    // Add drag functionality
    mainProgressContainer.addEventListener('mousedown', (e) => {
        isDragging = true
        startY = e.clientY
        e.preventDefault()
    })

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return

        const rect = progressContainer.getBoundingClientRect()
        const percentage = (e.clientY - rect.top) / rect.height
        
        const clampedPercentage = gsap.utils.clamp(0, 1, percentage)
        
        const targetScroll = clampedPercentage * lenis.limit
        
        lenis.scrollTo(targetScroll, {
            immediate: true
        })
    })

    document.addEventListener('mouseup', () => {
        isDragging = false
    })

    progressContainer.addEventListener('dragstart', (e) => {
        e.preventDefault()
    })
}

scrollProgress()