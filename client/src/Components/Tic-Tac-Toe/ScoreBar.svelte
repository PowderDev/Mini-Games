<div class="score-bar">
  <div class="user">
    <img src="https://avatars.dicebear.com/api/open-peeps/1.svg" alt="">
    <figure>Powder</figure>
  </div>
  <div class="score">
    <span>5</span>
    <span>:</span>
    <span>5</span>
  </div>
  <div class="user">
    <img src="https://avatars.dicebear.com/api/open-peeps/1.svg" alt="">
    <figure>Powder</figure>
  </div>
</div>


<style>
  .score-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 20rem;
  }

  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user figure {
    font-size: 1rem;
  }

  .score span {
    font-size: 4rem;
  }

  img {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
  }
</style>