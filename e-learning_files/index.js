$(document).ready(function () {
    $(".js-accordion-trigger").on("click", function () {
        // 次の.js-accordion-content要素を取得
        const content = $(this).closest(".p-study-progress__content").find(".js-accordion-content");

        // 表示状態を切り替え
        if (content.css("display") === "none") {
            content.css("display", "block");
        } else {
            content.css("display", "none");
        }
    });
    //アカウント情報モーダルの取得
    if (window.Laravel && window.Laravel.shownIdFlag === 0) {
        fetch("/gyosei/e-learning/shown-id")
            .then((response) => response.json())
            .then((data) => {
                $("#login_id").text(data.login_id);
                $("#password").text(data.password);
                $("#shown-id__medium__modal").addClass("is-open");
            })
            .catch((error) => {
                console.error("ログイン情報の取得に失敗:", error);
            });
    }

    //閉じる押下時にチェックボックスで処理分岐
    $("#shown-id-close-btn").on("click", function () {
        const isChecked = $('[name="account_box"]').prop("checked");
        if (isChecked) {
            $("#shown-id-form").submit();
        } else {
            $("#shown-id__medium__modal .c-modal--basic").removeClass(
                "is-open"
            );
        }
    });
});
