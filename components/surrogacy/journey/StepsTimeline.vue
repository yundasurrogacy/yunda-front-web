<template>
  <section class="steps-timeline flex justify-center w-full py-10 lg:py-20 px-8 lg:px-20">
    <div class="container max-w-300 mx-auto">
      <!-- Title -->
      <h2 class="title">
        {{ $t('surrogacyJourney.stepsTimeline.title') }}
      </h2>


      <!-- Desktop Curved Timeline -->
      <div class="desktop-timeline">
        <div class="timeline-grid">
          <!-- Row 1: Start Point -->
          <div class="timeline-row row-1">
            <div class="timeline-left"></div>
            <div class="timeline-center"><div class="start-dot"></div></div>
            <div class="timeline-right"></div>
          </div>

          <!-- Row 2: Step 1 (Left) -->
          <div class="timeline-row row-2">
            <div class="timeline-left">
              <div class="step-content">
                <div class="step-inner">
                  <div class="step-circle">
                    <span class="step-number">1</span>
                  </div>
                  <div class="step-text">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step1.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step1.subtitle') }}</p>
                  </div>

                </div>
              </div>
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
            </div>
          </div>

          <!-- Row 3: Step 2 (Right) -->
          <div class="timeline-row row-3">
            <div class="timeline-left">
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
              <div class="step-content">
                <div class="step-inner step-inner-reverse">
                  <div class="step-circle">
                    <span class="step-number">2</span>
                  </div>
                  <div class="step-text step-text-right">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step2.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step2.subtitle') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 4: Step 3 (Left) -->
          <div class="timeline-row row-4">
            <div class="timeline-left">
              <div class="step-content">
                <div class="step-inner">
                  <div class="step-circle">
                    <span class="step-number">3</span>
                  </div>
                  <div class="step-text">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step3.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step3.subtitle') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
            </div>
          </div>

          <!-- Row 5: Step 4 (Right) -->
          <div class="timeline-row row-5">
            <div class="timeline-left">
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
              <div class="step-content">
                <div class="step-inner step-inner-reverse">
                  <div class="step-circle">
                    <span class="step-number">4</span>
                  </div>
                  <div class="step-text step-text-right">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step4.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step4.subtitle') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 6: Step 5 (Left) -->
          <div class="timeline-row row-6">
            <div class="timeline-left">
              <div class="step-content">
                <div class="step-inner">
                  <div class="step-circle">
                    <span class="step-number">5</span>
                  </div>
                  <div class="step-text">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step5.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step5.subtitle') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
            </div>
          </div>

          <!-- Row 7: Step 6 (Right) -->
          <div class="timeline-row row-7">
            <div class="timeline-left">
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
              <div class="step-content">
                <div class="step-inner step-inner-reverse">
                  <div class="step-circle">
                    <span class="step-number">6</span>
                  </div>
                  <div class="step-text step-text-right">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step6.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step6.subtitle') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 8: Step 7 (Left) -->
          <div class="timeline-row row-8">
            <div class="timeline-left">
              <div class="step-content">
                <div class="step-inner">
                  <div class="step-circle">
                    <span class="step-number">7</span>
                  </div>
                  <div class="step-text">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step7.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step7.subtitle') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
            </div>
          </div>

          <!-- Row 9: Step 8 (Right) -->
          <div class="timeline-row row-9">
            <div class="timeline-left">
            </div>
            <div class="timeline-center"></div>
            <div class="timeline-right">
              <div class="step-content">
                <div class="step-inner step-inner-reverse">
                  <div class="step-circle">
                    <span class="step-number">8</span>
                  </div>
                  <div class="step-text step-text-right">
                    <h3 class="step-title">{{ $t('surrogacyJourney.stepsTimeline.step8.title') }}</h3>
                    <p class="step-subtitle">{{ $t('surrogacyJourney.stepsTimeline.step8.subtitle') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 10: End Point -->
          <div class="timeline-row row-10">
            <div class="timeline-left"></div>
            <div class="timeline-center"><div class="end-dot"></div></div>
            <div class="timeline-right"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Base Section */
.steps-timeline {
  background-color: var(--head-bg);
}


/* Title */
.title {
  color: var(--dark-brown);
  font-size: 30px;
  font-family: var(--font-primary);
  font-weight: 600;
  text-align: center;
  margin-bottom: 48px;
}

/* Desktop Timeline */
.desktop-timeline {
  display: block;
}

.timeline-grid {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
}

.timeline-row {
  display: flex;
  min-height: 80px;
}

.timeline-left {
  flex: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.timeline-right {
  flex: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.timeline-center {
  position: relative;
  min-width: 20px;
  background-color: transparent;
}

/* Row Specific Borders for Curved Path using Center Column */

/* Row 1: Start point - vertical line down to center */
.row-1 .timeline-center {
  border-bottom-right-radius: 60px;
  border-right: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  margin-bottom: -2px;
}
/* Row 2: Step 1 (Left) - connect from center to left */
.row-2 .timeline-left {
  border-left: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
}

.row-2 .timeline-center {
  border-bottom: 2px solid var(--dark-brown);
}

/* Row 3: Step 2 (Right) - connect from center to right */
.row-3 .timeline-center {
  border-bottom: 2px solid var(--dark-brown);
}

.row-3 .timeline-right {
  margin-top: -2px;
  border-right: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-bottom-right-radius: 60px;
  border-top-right-radius: 60px;
}

/* Row 4: Step 3 (Left) - connect from center to left */
.row-4 .timeline-left {
  border-left: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  margin-top: -2px;
}

.row-4 .timeline-center {
  border-bottom: 2px solid var(--dark-brown);
}

/* Row 5: Step 4 (Right) - connect from center to right */
.row-5 .timeline-center {
  border-bottom: 2px solid var(--dark-brown);
}

.row-5 .timeline-right {
  margin-top: -2px;
  border-right: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-bottom-right-radius: 60px;
  border-top-right-radius: 60px;
}

/* Row 6: Step 5 (Left) - connect from center to left */
.row-6 .timeline-left {
  border-left: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  margin-top: -2px;
}

.row-6 .timeline-center {
  border-bottom: 2px solid var(--dark-brown);
}

/* Row 7: Step 6 (Right) - connect from center to right */
.row-7 .timeline-center {
  border-bottom: 2px solid var(--dark-brown);
}

.row-7 .timeline-right {
  margin-top: -2px;
  border-right: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-bottom-right-radius: 60px;
  border-top-right-radius: 60px;
}

/* Row 8: Step 7 (Left) - connect from center to left */
.row-8 .timeline-left {
  border-left: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  margin-top: -2px;
}

.row-8 .timeline-center {
  border-bottom: 2px solid var(--dark-brown);
}

/* Row 9: Step 8 (Right) - connect from center to right */

.row-9 .timeline-right {
  margin-top: -2px;
  border-right: 2px solid var(--dark-brown);
  border-top: 2px solid var(--dark-brown);
  border-bottom: 2px solid var(--dark-brown);
  border-bottom-right-radius: 60px;
  border-top-right-radius: 60px;
}

/* Row 10: End point - connect from center */
.row-10 .timeline-center {
  border-top: 2px solid var(--dark-brown);
  border-left: 2px solid var(--dark-brown);
  border-top-left-radius: 60px;
  margin-top: -2px;
}

/* Start and End Dots */
.start-dot {
  width: 40px;
  height: 40px;
  background-color: var(--grayish-green);
  border-radius: 50%;
  top: -50px;
  right: -22px;
  position: absolute;
  z-index: 10;
}
.end-dot {
  width: 40px;
  height: 40px;
  background-color: var(--grayish-green);
  border-radius: 50%;
  bottom: -50px;
  left: -20px;
  position: absolute;
  z-index: 10;
}

/* Step Content */
.step-content {
  background-color: transparent;
  padding: 24px;
  position: relative;
}

.step-inner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.step-inner-reverse {
  flex-direction: row-reverse;
}

.step-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, 
  rgba(255, 255, 255, 0.8), 
  var(--grayish-green) 90%, 
  rgba(100, 100, 100, 0.1) 100%);
  border-radius: 50%;
  box-shadow:
  inset 0 4px 10px rgba(255, 255, 255, 0.6),   /* 中间顶部高光 */
  inset 0 -2px 8px rgba(0, 0, 0, 0.15);      /* 中间底部阴影 */
  flex-shrink: 0;
}

.step-number {
  color: var(--dark-brown);
  font-size: 64px;
  font-family: 'Cormorant', serif;
  font-weight: bold;
  font-style: italic;
  margin-top: -15px;
}

.step-text {
  flex: 1;
  min-width: 0;
}

.step-text-right {
  text-align: left;
}

.step-title {
  color: var(--dark-brown);
  font-size: 32px;
  font-family: var(--font-primary);
  font-weight: bold;
  margin-bottom: 8px;
}

.step-subtitle {
  color: var(--dark-brown);
  font-size: 20px;
  margin-bottom: 8px;
}

.step-duration {
  text-align: right;
  align-items: center
}

.step-inner-reverse .step-duration {
  text-align: left;
  align-items: center
}

.duration-text {
  color: var(--dark-brown);
  font-size: 32px;
  font-family: var(--font-primary);
  font-weight: 500;
}

.step-duration-mobile {
  color: var(--dark-brown);
  font-size: 28px;
  font-family: var(--font-primary);
  display: none;
}

/* Responsive */
@media (max-width: 767px) {
  .step-duration {
    display: none;
  }
  
  .step-duration-mobile {
    display: block;
  }
  
  .step-content {
    background-color: transparent;
  }
  
  /* Row 2, 4, 6, 8 (Left side) - extend right */
  .row-2 .step-content,
  .row-4 .step-content,
  .row-6 .step-content,
  .row-8 .step-content {
    margin-right: -50vw;
  }
  
  /* Row 3, 5, 7, 9 (Right side) - extend left */
  .row-3 .step-content,
  .row-5 .step-content,
  .row-7 .step-content,
  .row-9 .step-content {
    margin-left: -50vw;

  }
  
  /* Smaller fonts for mobile */
  .step-title {
    font-size: 20px;
  }
  
  .step-subtitle {
    font-size: 14px;
  }
  
  .step-number {
    font-size: 40px;
  }
  
  .step-circle {
    width: 60px;
    height: 60px;
  }
  
  .step-duration-mobile {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .steps-timeline {
    padding: 80px 80px;
  }

  .title {
    font-size: 40px;
    margin-bottom: 64px;
  }
}
</style>