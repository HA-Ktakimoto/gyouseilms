$(document).ready(function() {
    $('#loading').addClass('loaded');
});

// モーダルを開く
$(document).on('click', '.c-modal__open', function() {
    $('.c-modal').hide();
    const targetModal = $(this).data('target');
    const modalElement = $(targetModal).find('.c-modal');
    if (modalElement.length) {
        modalElement.show();
    }
});

// モーダルを閉じる
$(document).on('click', '.c-modal__close, .js-modal__close', function() {
    $('.c-modal').hide();
});

// ソートボタンをクリックした時の処理
$(document).on('click', '.sort-button', function(e) {
    const $value = $(this).val();
    $('#sort').val($value);
    $('#order').val($('#order').val() === 'asc' ? 'desc' : 'asc');

    $('#search').submit();
});

// 上部のページネーションボタンをクリックした時の処理
$(function () {
    $('#nextPageUrl').on('click', function () {
        const pageNumber = $(this).data('page');
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        searchParams.set('page', pageNumber);
        url.search = searchParams.toString();
        const nextUrl = url.toString();
        if (nextUrl.startsWith(window.location.origin)) {
            location.href = nextUrl;
        } else {
            alert('不正な遷移先が検出されました。');
        }
    });

    $('#previousPageUrl').on('click', function () {
        const pageNumber = $(this).data('page');
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        searchParams.set('page', pageNumber);
        url.search = searchParams.toString();
        const prevUrl = url.toString();
        if (prevUrl.startsWith(window.location.origin)) {
            location.href = prevUrl;
        } else {
            alert('不正な遷移先が検出されました。');
        }
    });
});

// フラッシュメッセージをフェードアウトさせる
$('.flash_message').fadeTo(4000, 0, function () {
    $(this).css("visibility", "hidden");
});

// 新規作成・編集画面でEnterキーを押した時にsubmitされないようにする
$(document).on('keydown', '#create-form', function(event) {
    if (event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// 新規作成・編集画面でファイル選択時の処理
$(document).on('change', '#file', function() {
    let fileName;
    if (this.files && this.files[0]) {
        fileName = this.files[0].name;
        $('#file-name').text(fileName);
    } else {
        fileName = '選択されていません';
        $('#file-name').text(fileName);
    }
});

// ファイルダウンロードの処理
$(document).on('click', '.download-file', function() {
    const filePath = $(this).attr('data-file_path');
    const fileName = $(this).attr('data-file_name');
    if (!confirm('ファイルをダウンロードします。\n' + `ファイル名: ${fileName}`)) {
        return;
    }

    $.ajax({
        url: `/file/download`,
        type: 'POST',
        data: {
            '_token': $('meta[name="csrf-token"]').attr('content'), 
            file_path: filePath,
            file_name: fileName
        },
        xhrFields: {
            responseType: 'blob'
        },
        success: function(blob) {
            // Blob を使用してダウンロードリンクを作成
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName; // 正しいファイル名を設定
            link.click();

            // リソースを解放
            window.URL.revokeObjectURL(link.href);
        },
        error: function(xhr, status, error) {
            alert('ファイルをダウンロードできませんでした。');
        }
    });
});

// 表示件数の変更
$(document).on('change', '#display_count_select', function() {
    const displayCount = $(this).val();
    $('#display_count').val(displayCount);
    $('#search').submit();
});

// 送信ボタンの二重クリック防止
$(document).on('click', 'button[type="submit"]', function() {
    const $button = $(this);
    if ($button.data('clicked')) {
        return false;
    }
    $button.data('clicked', true);

    setTimeout(() => {
        $button.data('clicked', false);
    }, 3000); // 3秒後に解除（適宜調整）
});

// ブラウザの戻るボタンでフォームをリセット
$(window).on('pageshow', function(event) {
    // ブラウザバック時にフォーム内容とファイル名表示をリセット
    if ((event.originalEvent && event.originalEvent.persisted) || (window.performance && window.performance.navigation.type === 2)) {
        const $form = $('#create-form');
        if ($form.length) {
            $form[0].reset();
        }
        $('#file-name').text('選択されていません');
    }
});
