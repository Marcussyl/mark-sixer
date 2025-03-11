//storage persistence
// useEffect(() => {
//   const draws = window.localStorage.getItem("Mark_Sixer_Draws");
//   const releases = window.localStorage.getItem("Mark_Sixer_Releases");
//   const results = window.localStorage.getItem("Mark_Sixer_Results");

//   if (draws && releases && results) {
//     try {
//       setDraws(JSON.parse(draws));
//       setReleases(JSON.parse(releases));
//       setResults(JSON.parse(results));
//     } catch (error) {
//       console.error("Error parsing stored data:", error);
//     }
//   }
// }, []);

// useEffect(() => {
//   window.localStorage.setItem("Mark_Sixer_Draws", JSON.stringify(draws));
// }, [draws]);

// useEffect(() => {
//   window.localStorage.setItem(
//     "Mark_Sixer_Releases",
//     JSON.stringify(releases)
//   );
// }, [releases]);

// useEffect(() => {
//   window.localStorage.setItem("Mark_Sixer_Results", JSON.stringify(results));
// }, [results]);
