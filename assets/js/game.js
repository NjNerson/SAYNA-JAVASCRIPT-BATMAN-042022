$(document).ready(function() {


    /* Ajout attribut: name id,for */
    let $quiz = $(".quiz-container")
    let i, j;
    for (i = 0; i < $quiz.length; i++) {
        var $qcm = $($quiz[i]).find(".qcm")
        for (j = 0; j < $qcm.length; j++) {
            $attr = `choix${i}${j}`;
            $($($qcm[j]).find("input")[0]).attr({ "id": $attr, "name": $attr })
            $($($qcm[j]).find("label")[0]).attr({ "for": $attr })
        }
    }
});