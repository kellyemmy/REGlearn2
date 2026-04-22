document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const slider = document.getElementById("userSlider");
    const userDisplay = document.getElementById("userDisplay");
    
    // Right Panel Elements
    const planName = document.getElementById("planName");
    const pricingSection = document.getElementById("pricingSection");
    const enterpriseSection = document.getElementById("enterpriseSection");
    const summaryPrice = document.getElementById("summaryPrice");
    const billingPeriod = document.getElementById("billingPeriod");
    const summaryUsersDetail = document.getElementById("summaryUsersDetail");
    const featureList = document.getElementById("featureList");
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    const toggle = document.getElementById("billingToggle");

    // Initial State
    let users = 20;
    let yearly = false;

    function updateUI() {
        // 1. Dynamic Slider Gradient (Fills Royal Blue up to the thumb)
        const percent = ((users - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #1e3a8a ${percent}%, #e5e7eb ${percent}%)`;

        // 2. Update Basic Displays
        userDisplay.innerText = users;

        // 3. ENTERPRISE LOGIC: If users > 50, switch to Custom Enterprise Mode
        if (users > 50) {
            planName.innerText = "Enterprise Plan";
            pricingSection.classList.add("hidden");
            enterpriseSection.classList.remove("hidden");
            checkoutBtn.innerText = "Contact Sales";
            
            featureList.innerHTML = `
                <li class="flex items-center gap-3"><span class="text-yellow-500">✔</span> Access to 30,000+ top courses</li>
                <li class="flex items-center gap-3"><span class="text-yellow-500">✔</span> Advanced analytics and insights</li>
                <li class="flex items-center gap-3"><span class="text-yellow-500">✔</span> Custom user groups & SSO</li>
                <li class="flex items-center gap-3"><span class="text-yellow-500">✔</span> AI Role Play Enhanced</li>
            `;
        } 
        // 4. TEAM PLAN LOGIC: 2-50 Users
        else {
            planName.innerText = "Team Plan";
            pricingSection.classList.remove("hidden");
            enterpriseSection.classList.add("hidden");
            checkoutBtn.innerText = "Proceed to Checkout";

            // Calculate price based on toggle (20% off for yearly)
            let pricePerUser = yearly ? 24 : 30; 
            let total = users * pricePerUser;
            
            summaryPrice.innerText = `$${total}`;
            billingPeriod.innerText = yearly ? "/month (billed annually)" : "/month";
            summaryUsersDetail.innerText = `For ${users} Users`;

            featureList.innerHTML = `
                <li class="flex items-center gap-3"><span class="text-yellow-500">✔</span> Access to 28,000+ top courses</li>
                <li class="flex items-center gap-3"><span class="text-yellow-500">✔</span> Certification prep for 200+ exams</li>
                <li class="flex items-center gap-3"><span class="text-yellow-500">✔</span> Practice tests and AI learning</li>
            `;
        }
    }

    // Event Listeners
    slider.addEventListener("input", e => {
        users = parseInt(e.target.value);
        updateUI();
    });

    toggle.addEventListener("change", e => {
        yearly = e.target.checked;
        updateUI();
    });

    // Run once on load to set initial state
    updateUI();
});