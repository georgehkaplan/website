var icon = document.getElementById("icon");

icon.onclick = function() {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "Images/sun-icon.png";
  } else {
    icon.src = "Images/moon-icon.png";
  }
}

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark-theme");
  icon.src = "Images/sun-icon.png";
}
if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  document.body.classList.remove("dark-theme");
  icon.src = "Images/moon-icon.png";
}

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    } else {
      return;
    }
  });
},appearOptions);

const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(hiddenElement => {
    appearOnScroll.observe(hiddenElement);
});

let currentImageIndex = 0;
let images = [];

function expandCard(card) {
  let modal = document.getElementById('myModal');
  let modalImg = document.querySelector('.modal-image');
  let modalText = document.querySelector('.modal-text');
  let closeButton = card.querySelector('.close');

  // Gather all image sources from the card
  images = Array.from(card.querySelectorAll('img')).map(img => img.src);
  currentImageIndex = 0; // Start with the first image

  // Show or hide navigation arrows based on the number of images
  document.querySelector('.prev').style.display = images.length > 1 ? 'block' : 'none';
  document.querySelector('.next').style.display = images.length > 1 ? 'block' : 'none';

  // Show the modal with content
  modal.style.display = 'block';
  modalImg.src = images[currentImageIndex];
  modalText.innerHTML = card.querySelector('.card-content').innerHTML;

  // Show the close button for the card
  closeButton.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

function changeImage(step) {
  var modalImg = document.querySelector('.modal-image');

  // Update the currentImageIndex first
  currentImageIndex += step;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;

  // Change the image source before applying the transition
  modalImg.src = images[currentImageIndex];

  // Apply the transition effect
  // Remove any existing transition classes
  modalImg.classList.remove('slide-from-left', 'slide-from-right');

  // Add the class for the new direction
  if (step === 1) {
    // If moving forward, slide in from right
    modalImg.classList.add('slide-from-right');
  } else {
    // If moving backward, slide in from left
    modalImg.classList.add('slide-from-left');
  }

  // Remove the transition class after the animation completes
  setTimeout(() => {
    modalImg.classList.remove('slide-from-left', 'slide-from-right');
  }, 300); // Match this with the duration of your CSS transition
}

function closeCard(event, card) {
  event.stopPropagation();
  closeModal();
}

// Add event listener to close modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
  let modal = document.getElementById('myModal');
  if (event.target === modal) {
    closeModal();
  }
});
