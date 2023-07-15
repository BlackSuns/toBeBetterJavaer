import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c as p,a as e,d as r,b as n,e as s}from"./app-1c5b5ce3.js";const l={},c={href:"https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw",target:"_blank",rel:"noopener noreferrer"},h=e("strong",null,"560 多名",-1),d={href:"https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw",target:"_blank",rel:"noopener noreferrer"},g=s('<p>秒杀系统的设计是高级职位面试中非常高频的一道题目，它可以较好地考察候选人的知识体系情况。对于我们来说，学习秒杀系统的设计，能够让我们学以致用，设计系统的时候考虑得更加全面。今天就带你一起来看看怎么设计一个秒杀系统！</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrgrnsjygmsxtnhrhsj-bc1898e6-ed8b-4594-bdd5-165886ce9f97.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>活动一般出现在电商的促销活动中，一般是指定了很少数量的商品，以极低的价格，让大量的用户参与，从而造成大量用户在极短的时间内参与活动，进而造成系统在极短的时间内有极高的流量。系统设计的目的是使系统能够稳定地支撑活动的进行，因此其稳定性、高可用是我们考虑的第一位。</p><p>要知道如何进行秒杀系统的优化，那我们需要先对请求的整个流程有个全局的认识。<strong>一般来说，秒杀活动请求以公网为划分点，可以分为：前端部分、后端部分。</strong> 前端部分指的是从用户端到进入后端服务前的部分，包括了移动端的处理、DNS 解析、公网的数据传递等。</p><p>后端部分指的是经公网进入了后端的服务器网络里，包括了前置的负载均衡（Nginx 等）、应用服务器、数据库层等。秒杀活动的整个流程可以用下图来表示。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrgrnsjygmsxtnhrhsj-9f9def72-fb75-4e36-9529-61f4cb93d830.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>the-process-of-network-request</p><p>我们要去设计一个秒杀系统，那自然也是从这两大部分来进行优化。整体思路是尽量将流量挡在前面，让尽量少的流量留到后端部分。因为越往后端，我们的处理逻辑就越重，其处理能力也越弱。</p><h2 id="前端优化" tabindex="-1"><a class="header-anchor" href="#前端优化" aria-hidden="true">#</a> 前端优化</h2><p>对于前端部分来说，常见的优化手段有：页面静态化 + CDN、请求频率限制。</p><h3 id="页面静态化-cdn" tabindex="-1"><a class="header-anchor" href="#页面静态化-cdn" aria-hidden="true">#</a> 页面静态化 + CDN</h3><p>一般来说，活动页面是流量最大的地方。活动页面上绝大部分内容都是固定的，比如：商品描述、图片等。这时候没有必要每次都去请求服务端，而是将这些静态的内容放到 CDN 上。</p><p>每次打开页面的时候，直接去请求 CDN 服务器，能极大地减少后端的请求流量。加入了 CDN 之后，其请求过程如下：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrgrnsjygmsxtnhrhsj-7d04e7cc-949d-4a03-884f-0178b303f196.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>CDN 优化静态数据</p><p>所谓的 CDN 就是内容分发网络，它由非常多台分布在世界各地的缓存服务器组成。每次用户请求特定域名的时候，会转发到对应 CDN 的 DNS 解析服务器，随后会返回一台离用户地理位置最近的一台 CDN 服务器。</p><p>随后，用户直接请求这台 CDN 服务器获取数据，从而极大地减少了长途网络传输的时间，并且也减少了后端服务器的压力。</p><p><strong>因此，对于秒杀活动设计来说，我们可以将所有可以静态化的内容全部静态化，然后将其配置在 CDN 服务器上。这样既提高了用户打开页面的时间，又减少了后端服务器的压力。</strong></p><h3 id="请求频率限制" tabindex="-1"><a class="header-anchor" href="#请求频率限制" aria-hidden="true">#</a> 请求频率限制</h3><p>请求频率限制，指的是根据业务的特点，在前端做一些流量拦截，减少后端服务器的压力。常见的拦截方式有：</p><ol><li>设定一个请求概率，只允许 30% 的概率向后端发送接口请求。</li><li>设定一个请求频率，例如 10 秒钟只能请求 1 次，随后按钮置灰。</li></ol><p>通过这种方式，我们可以减少很大一部分流量。但在具体实现的时候，可能需要考虑安全问题，预防某些用户直接调用后台接口，绕过前端的频率检查。</p><p>常见的方法是在频率检查时生成一个参数，随后请求后端服务时携带上该参数。没有该参数的请求，都视为非法请求，直接拒绝该请求。</p><h2 id="后端优化" tabindex="-1"><a class="header-anchor" href="#后端优化" aria-hidden="true">#</a> 后端优化</h2><p>无论我们做多大的努力，始终还是会有不少流量会来到后端服务器这里。一般来说，后端的优化有如下几种方式：</p><ol><li>增加缓存层 + 预热数据</li><li>MQ 异步处理</li><li>限流、熔断、兜底</li><li>业务侧优化</li></ol><h3 id="增加缓存层-预热数据" tabindex="-1"><a class="header-anchor" href="#增加缓存层-预热数据" aria-hidden="true">#</a> 增加缓存层 + 预热数据</h3><p>如果我们所有数据都去读取数据库，数据库可能无法承受较大的流量，此时一个常见的优化就是增加缓存层。</p><p>当我们需要查询数据库之前，我们先去查询缓存，这样可以减少绝大部分的数据库请求，减轻数据库压力。如果在缓存中找不到数据，我们再去请求数据库，随后再将数据缓存到缓存中。</p><p>在引入缓存层的时候，我们需要考虑缓存击穿、缓存穿透的可能性，在写相关代码的时候就要做好这些优化。另外，我们在秒杀活动开始之前，可以手动将热点数据加载到缓存中，从而避免秒杀时去请求数据库。</p><h3 id="mq-异步处理" tabindex="-1"><a class="header-anchor" href="#mq-异步处理" aria-hidden="true">#</a> MQ 异步处理</h3><p>我们知道秒杀活动一般涉及抢购、下单、支付、发货等阶段，而抢购与后续的几个阶段是可以异步执行的。为了避免对下单、支付、发货等阶段产生影响，我们可以将抢购阶段与后续阶段用 MQ 进行解耦处理。当用户抢购成功后，往消息队列中丢入一台消息，随后再由订单系统消费进行下单处理。</p><p>通过各系统之间的解耦处理，我们可以将原本同步的处理方式变为异步处理，从而大大的减少了请求的处理时间，提高了系统的并发处理能力。其次，也能避免系统之间相互影响，提高了整体系统的稳定性。</p><h3 id="限流、熔断、降级" tabindex="-1"><a class="header-anchor" href="#限流、熔断、降级" aria-hidden="true">#</a> 限流、熔断、降级</h3><p>虽然我们做了非常多的优化措施，但还是可能存在请求超量的可能性，那怎么办呢？</p><p>我们可以在每个业务系统做限流操作，从而避免因为请求太多，导致整个系统都无法工作。当并发请求在正常范围内时，我们正常处理请求。当超过设置的限流阈值时，我们则直接拒绝该请求，提示用户抢购失败。</p><p>如果没有限流操作，那么系统直接崩溃了，一个请求都处理不了。而通过限流这种方式，系统至少还可以保持正常工作，而不至于一个请求都处理不了。而超量的需求，本来就处理不了，因此提示失败也是情理之中。</p><p>除了限流之外，不同的系统还可以采用熔断、降级的服务治理措施。</p><p>熔断指的是请求的错误次数超过阈值时，不再到用后端服务，直接返回失败。同时每隔一定时间放几个请求去重试后端服务，看看是否正常。如果正常则关闭熔断状态，如果失败则继续快速失败。<strong>熔断的目的是避免因下游短暂的异常，导致上游不断重试，最终造成下游有太多请求，最终压垮下游系统。</strong></p><p>降级指的是当服务失败或异常后，返回指定的默认信息。<strong>降级的目的是保证有基本的信息，当下游异常时，与其返回空信息，不如返回一个有业务含义的默认信息，可以提高用户体验。</strong></p><h3 id="业务侧优化" tabindex="-1"><a class="header-anchor" href="#业务侧优化" aria-hidden="true">#</a> 业务侧优化</h3><p>一般来说，经过上述的整体优化之后，系统已经能够比较稳当地应对秒杀活动了。如果此时还是流量比较大，那么或许应该从业务侧去进行优化了。</p><p>例如 12306 刚开始的时候，购买时间都在同一时刻，这导致同一时刻并发量太大，系统经常支撑不住。后来 12306 将购票周期放长，可以提前 20 天购买火车票。通过业务侧的优化，我们将本来在 1 个小时的抢购分摊到了 20 天，服务器压力一下子降低了 480 倍！</p><p><strong>张小龙也说过：如果公司最厉害的程序员来实现业务都觉得复杂，那很可能就是业务确实不合理，这时候应该从业务侧进行优化。</strong></p><p>例如一个存储了 10 亿条记录的消息记录表，业务侧既想查询速度快，又想进行 1 年数据范围的数据查询，这无论如何都是无法实现的。这时候就需要从业务需求侧进行优化，否则是无法两全其美的。</p><p>对于这个场景，一个合理的实现方式是：要实现 1 年数据范围的查询，那么只能根据消息 ID 进行，因为这样可以使用上索引。而要根据时间范围进行查询，只能缩短查询时间到 3 天内，这样也可以满足业务需求。</p><p><strong>因此从业务侧进行优化，是一个四两拨千斤的办法，可以极大地降低技术侧实现的难度。</strong></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>设计一个秒杀系统，整体而言可以从前端与后端进行优化。</p><p><strong>对于前端优化而言，可以从「页面静态化 + CDN」、请求频率限制进行优化。</strong></p><p>其中「页面静态化 + CDN」指的是将不变的静态数据固定下来，然后放入 CDN 服务器，从而降低用户请求的响应速度，降低服务器的并发压力。请求频率限制，则是通过抢购概率与抢购频率限制，降低后端服务器的服务压力。</p><p><strong>对于后端优化而言，一般有「增加缓存层 + 预热数据」、「MQ 异步处理」、「限流、熔断、降级」、业务侧优化这 4 种优化方式。</strong></p><p>其中「增加缓存层 + 预热数据」指的是将热点数据存入缓存，并在活动开始前提前加载到缓存中，降低数据库层的读取压力。「MQ 异步处理」指的是对于非必要的业务逻辑，通过 MQ 进行异步处理，降低请求处理延时，同时提高业务系统整体稳定性。</p><p>「限流、熔断、降级」是对于整体微服务的保护，其中限流指的是对请求进行限制，当超过限流阈值时，直接拒绝请求，保护系统本身；熔断指的是保护下游系统，当请求下游系统连续错误超过阈值时，自动不去请求下游系统，避免因重试流量过大击垮下游系统。</p><p>降级指的是当请求失败时，自动返回默认数据，提高用户体验。业务侧优化，则是指从业务层面去进行逻辑优化，从而降低技术复杂度，使得业务与技术复杂度达到一个平衡的状态，有利于更好地实现秒杀系统的高可用与高并发。</p><p>上面说到的 6 个优化思路，是设计秒杀系统常见的优化思路。<strong>但在实际业务场景中，除了要保障正常的功能设计之外，还还考虑防刷、安全、黑产等问题</strong>，此时可能需要多考虑一些其他优化，例如：黄牛利用抢购工具抢购，导致正常用户无法抢到商品等。</p><p>这时候可能需要考虑增加验证码，用 App 设备指纹等风控措施。<strong>此外，对于秒杀系统而言，做好业务指标和系统指标的埋点监控也是非常重要的。</strong></p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrgrnsjygmsxtnhrhsj-bc1898e6-ed8b-4594-bdd5-165886ce9f97.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><p>没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。</p><p><strong>推荐阅读</strong>：</p>',61),f={href:"https://mp.weixin.qq.com/s/2IUe50xBhuEWKDzARVd51A",target:"_blank",rel:"noopener noreferrer"},m={href:"https://mp.weixin.qq.com/s/3lqp4x1B5LI1hNjWAi6v1g",target:"_blank",rel:"noopener noreferrer"},b={href:"https://mp.weixin.qq.com/s/ZeA-mEyMkEeSHRtd8Pob9A",target:"_blank",rel:"noopener noreferrer"},_={href:"https://mp.weixin.qq.com/s/fNMhpER0tp5RO5TGcgALMQ",target:"_blank",rel:"noopener noreferrer"},x={href:"https://mp.weixin.qq.com/s/IEEkWiI9iN4MEhoHvrTgcg",target:"_blank",rel:"noopener noreferrer"},u={href:"https://mp.weixin.qq.com/s/KxUMq2YmlIBMbAeRwUm8JA",target:"_blank",rel:"noopener noreferrer"},q={href:"https://mp.weixin.qq.com/s/PxgZkuA_SnAgG7xfwlKLgw",target:"_blank",rel:"noopener noreferrer"},j={href:"https://mp.weixin.qq.com/s/R13FkPipfEMKjqNaCL3UoA",target:"_blank",rel:"noopener noreferrer"},k=e("figure",null,[e("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanxxtjgzysjyyds-33afdc45-d78b-46e0-91c2-1107161496e9.jpg",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),N={href:"https://mp.weixin.qq.com/s/ksJcA-8v2kY5J0dkMF6W5Q",target:"_blank",rel:"noopener noreferrer"};function w(v,D){const t=i("ExternalLinkIcon");return o(),p("div",null,[e("blockquote",null,[e("p",null,[e("a",c,[r("二哥的编程星球"),n(t)]),r("已经有 "),h,r(" 小伙伴加入了，如果你也需要一个良好的学习氛围，"),e("a",d,[r("戳链接"),n(t)]),r("加入我们吧！这是一个 Java 学习指南 + 编程实战的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做项目、刷力扣，冲冲冲。")])]),g,e("ul",null,[e("li",null,[e("a",f,[r("新一代开源免费的终端工具，太酷了"),n(t)])]),e("li",null,[e("a",m,[r("最大成就，拿到一等奖学金"),n(t)])]),e("li",null,[e("a",b,[r("银行开发太安逸，奋发图强要跳槽"),n(t)])]),e("li",null,[e("a",_,[r("这个大专生，强的离谱！"),n(t)])]),e("li",null,[e("a",x,[r("一怒之下，退伍转码"),n(t)])]),e("li",null,[e("a",u,[r("没必要为实习碰的头破血流"),n(t)])]),e("li",null,[e("a",q,[r("网站挣了 200 美刀后的感触"),n(t)])]),e("li",null,[e("a",j,[r("在 IDEA 里下五子棋不过分吧？"),n(t)])])]),k,e("blockquote",null,[e("p",null,[r("转载链接："),e("a",N,[r("https://mp.weixin.qq.com/s/ksJcA-8v2kY5J0dkMF6W5Q"),n(t)]),r("，出处：JavaGuide，整理：沉默王二")])])])}const A=a(l,[["render",w],["__file","miansgrgrnsjygmsxtnhrhsj.html.vue"]]);export{A as default};
