// app.js : 영화 배열을 다루는 함수 6개 / 레탄하이(2551017) / 10주차
// average : 영화 배열 ⇒ 평균 평점(숫자)

const average = list => {
    let sum = 0;
    for (const m of list) sum += m.rating;
    return sum / list.length;
}
console.log("평균:", average(movies));

const best = list => {
    let top = list[0];
    for (const m of list) if (m.rating > top.rating) top = m;
    return top;
}
console.log("최고:", best(movies).title);

const filterByRating = (list, min) => list.filter(m => m.rating >= min);
console.log("8점 이상:", filterByRating(movies, 8).length + "편");

const sortByRating = list => [...list].sort((a, b) => b.rating - a.rating);
const sorted = sortByRating(movies);
console.log("정렬 1위:", sorted[0].title, "\n원본 1번:", movies[0].title);

const yearsSince = dateStr => new Date().getFullYear() - new Date(dateStr).getFullYear();
console.log(yearsSince(movies[1].date) + "년 전 개봉");

const posterUrl = (path, size) => "https://image.tmdb.org/t/p/" + size + path;
console.log(posterUrl(movies[0].poster, "w342"));




// renderCards : 영화 배열 ⇒ 보드에 카드 생성(반환값 없음)
function renderCards(list) {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        if (m.rating >= 8) { card.classList.add("hot"); }

        card.onclick = () => alert(m.overview);

        card.innerHTML = `
 <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
 <span class="badge">${m.rating}</span>
 <div class="info">
 <h2>${m.title}</h2>
 <p class="year">${m.year}</p>
 <button class="like" type="button">♥</button>
 </div>`;
        board.appendChild(card);
    }
    document.getElementById("count").textContent = list.length + "편";
    updateLikeCount();

     
if (list.length === 0) { board.classList.add("is-empty"); } else 
{ board.classList.remove("is-empty"); }
}
// sortBy : 영화 배열, 키 이름, 내림차순 여부 ⇒ 정렬한 새 배열(원본은 그대로)
function sortBy(list, key, desc) {
 const copy = [...list];
 copy.sort((a, b) => {
 if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
 return a[key] - b[key];
 });
 if (desc) copy.reverse();
 return copy;
}
// applySort : 선택 상자 값으로 정렬해서 다시 그리기(반환값 없음)
function applySort() {
 renderCards(getView());
}

applySort();
document.getElementById("sort").addEventListener("change", applySort);

document.getElementById("q").addEventListener("input", (e) => {
 renderCards(getView());
});


function getView() {
  const keyword = document.getElementById("q").value.trim().toLowerCase();
  const found = movies.filter(m => m.title.toLowerCase().includes(keyword));
  const key = document.getElementById("sort").value;
  return sortBy(found, key, key !== "title");
}

//(e) => {}와 function(e) {}는 둘 다 버튼을 클릭하는 것과 같은 이벤트를 실행할 수 있하지만 
// (e) => {}가 코드가 더 짧고 작성하기 쉽다. 
// 사진에서 확인한 결과, function(e)를 사용하면 this가 클릭한 버튼을 가리키지만
// (e) => {}를 사용하면 this가 Window로 나타난다. 
// 하지만 두 가지 방법 모두 e를 통해 이벤트 정보를 가져올 수 있고, 같은 기능을 실행할 수 있다.
document.querySelector(".board").addEventListener("click", (e) =>{
   
     if (e.target.classList.contains("like")) { e.target.classList.toggle("liked"); updateLikeCount(); } });


 
function updateLikeCount() { document.getElementById("likeCount").textContent = 
document.querySelectorAll(".liked").length; }



document.getElementById("q").addEventListener("keydown", (e) => { if (e.key === "Escape") 
{ e.target.value = ""; renderCards(getView()); } });