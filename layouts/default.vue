<template>
    <header>
        <nav class="navbar">
            <div class="container">
                <div class="logo--navbar">
                    <img src="~/assets/icons/seati/seati.svg" />
                </div>
            </div>
        </nav>
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <div class="container">
            <div class="footer-cols">
                <div class="first col">
                    <div class="logo--footer">
                        <img src="~/assets/icons/seati/seati-white.svg" />
                    </div>
                    <div class="footer-text">
                        <p>Lab 是 Seati 玩家用于合理控制 Seati 服务器和查看各项状态或指标的网页端面板工具。</p>
                        <p><small>&copy; 2024 Seati · Built with Nuxt 3 with 🤔</small></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>

</script>

<style lang="less" scoped>
@navbar-height: 60px;

.navbar {
    height: @navbar-height;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}

.logo--navbar {
    img {
        height: calc(.5 * @navbar-height);
    }
}

.logo--footer {
    img {
        width: 30%;
    }
}

main {
    padding-top: @navbar-height;
}

footer {
    background: #212121;
    color: white;

    .container {
        padding: 32px 0;
    }
}

.footer-cols {
    display: flex;
    align-items: flex-start;
    gap: 3rem;

    .col {
        width: 30%;
    }
}

.footer-text {
    font-size: 14px;
    line-height: 1.5;
}
</style>