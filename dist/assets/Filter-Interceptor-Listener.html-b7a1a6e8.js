import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c,a as n,d as s,b as t,e as i}from"./app-1c5b5ce3.js";const l={},u=i(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>先说作用。</p><ul><li>过滤器（Filter）：当有一堆请求，只希望符合预期的请求进来。</li><li>拦截器（Interceptor）：想要干涉预期的请求。</li><li>监听器（Listener）：想要监听这些请求具体做了什么。</li></ul><p>再说区别。</p><p>过滤器是在请求进入容器后，但还没有进入 Servlet 之前进行预处理的。如下图所示。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-2a28621b-2cc1-4d29-87a1-cf6a01d95443.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>拦截器是在请求进入控制器（Controller） 之前进行预处理的。</p><p>虚线内就是过滤器和拦截器的作用范围：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-dd48851b-c123-4fd8-b82d-9ae87b33745d.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>过滤器依赖于 Servlet 容器，而拦截器依赖于 Spring 的 IoC 容器，因此可以通过注入的方式获取容器当中的对象。</p><p>监听器用于监听 Web 应用中某些对象的创建、销毁、增加、修改、删除等动作，然后做出相应的处理。</p><h2 id="过滤器" tabindex="-1"><a class="header-anchor" href="#过滤器" aria-hidden="true">#</a> 过滤器</h2><ul><li>过滤敏感词汇（防止sql注入）</li><li>设置字符编码</li><li>URL级别的权限访问控制</li><li>压缩响应信息</li></ul><p>过滤器的创建和销毁都由 Web 服务器负责，Web 应用程序启动的时候，创建过滤器对象，为后续的请求过滤做好准备。</p><p>过滤器可以有很多个，一个个过滤器组合起来就成了 FilterChain，也就是过滤器链。</p><p>在 Spring 中，过滤器都默认继承了 OncePerRequestFilter，顾名思义，OncePerRequestFilter 的作用就是确保一次请求只通过一次过滤器，而不重复执行。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-aaa1c537-c8ed-4c5d-b27f-93c1409f2748.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在编程喵实战项目中，我们就是通过继承 OncePerRequestFilter 来实现 JWT 登录授权过滤的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtAuthenticationTokenFilter</span> <span class="token keyword">extends</span> <span class="token class-name">OncePerRequestFilter</span> <span class="token punctuation">{</span>
	<span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doFilterInternal</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span>
                                    <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span>
                                    <span class="token class-name">FilterChain</span> chain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 从客户端请求中获取 JWT</span>
        <span class="token class-name">String</span> authHeader <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tokenHeader<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 该 JWT 是我们规定的格式，以 tokenHead 开头</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>authHeader <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> authHeader<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tokenHead<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// The part after &quot;Bearer &quot;</span>
            <span class="token class-name">String</span> authToken <span class="token operator">=</span> authHeader<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tokenHead<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 从 JWT 中获取用户名</span>
            <span class="token class-name">String</span> username <span class="token operator">=</span> jwtTokenUtil<span class="token punctuation">.</span><span class="token function">getUserNameFromToken</span><span class="token punctuation">(</span>authToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;checking username:{}&quot;</span><span class="token punctuation">,</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// SecurityContextHolder 是 SpringSecurity 的一个工具类</span>
            <span class="token comment">// 保存应用程序中当前使用人的安全上下文</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>username <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 根据用户名获取登录用户信息</span>
                <span class="token class-name">UserDetails</span> userDetails <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userDetailsService<span class="token punctuation">.</span><span class="token function">loadUserByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 验证 token 是否过期</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>jwtTokenUtil<span class="token punctuation">.</span><span class="token function">validateToken</span><span class="token punctuation">(</span>authToken<span class="token punctuation">,</span> userDetails<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 将登录用户保存到安全上下文中</span>
                    <span class="token class-name">UsernamePasswordAuthenticationToken</span> authentication <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UsernamePasswordAuthenticationToken</span><span class="token punctuation">(</span>userDetails<span class="token punctuation">,</span>
                            <span class="token keyword">null</span><span class="token punctuation">,</span> userDetails<span class="token punctuation">.</span><span class="token function">getAuthorities</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    authentication<span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WebAuthenticationDetailsSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">buildDetails</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAuthentication</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        chain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们利用 Spring Initializr 来新建一个 Web 项目 codingmore-filter-interceptor-listener。</p><p>添加一个过滤器 MyFilter ：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebFilter</span><span class="token punctuation">(</span>urlPatterns <span class="token operator">=</span> <span class="token string">&quot;/*&quot;</span><span class="token punctuation">,</span> filterName <span class="token operator">=</span> <span class="token string">&quot;myFilter&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Filter</span><span class="token punctuation">.</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>filterConfig<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> chain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        chain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Execute cost=&quot;</span><span class="token operator">+</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-</span>start<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Filter</span><span class="token punctuation">.</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@WebFilter 注解用于将一个类声明为过滤器，urlPatterns 属性用来指定过滤器的 URL 匹配模式，filterName 用来定义过滤器的名字。</p><p>MyFilter 过滤器的逻辑非常简单，重写了 Filter 的三个方法，在 doFilter 方法中加入了时间戳的记录。</p><p>然后我们在项目入口类上加上 @ServletComponentScan 注解，这样过滤器就会自动注册。</p><p>启动服务器，访问任意的 URL。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-c865b6d2-30d3-435b-a930-c732caed17ce.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="拦截器" tabindex="-1"><a class="header-anchor" href="#拦截器" aria-hidden="true">#</a> 拦截器</h2><ul><li>登录验证，判断用户是否登录</li><li>权限验证，判断用户是否有权限访问资源，如校验token</li><li>日志记录，记录请求操作日志（用户ip，访问时间等），以便统计请求访问量</li><li>处理cookie、本地化、国际化、主题等</li><li>性能监控，监控请求处理时长等</li></ul><p>我们来写一个简单的拦截器 LoggerInterceptor：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoggerInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">HandlerInterceptor</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;preHandle{}...&quot;</span><span class="token punctuation">,</span>request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span> <span class="token class-name">ModelAndView</span> modelAndView<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">HandlerInterceptor</span><span class="token punctuation">.</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">postHandle</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> modelAndView<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterCompletion</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span> <span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">HandlerInterceptor</span><span class="token punctuation">.</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">afterCompletion</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个拦截器必须实现 HandlerInterceptor 接口，preHandle 方法是 Controller 方法调用前执行，postHandle 是 Controller 方法正常返回后执行，afterCompletion 方法无论 Controller 方法是否抛异常都会执行。</p><p>只有 preHandle 返回 true 的话，其他两个方法才会执行。</p><p>如果 preHandle 返回 false 的话，表示不需要调用Controller方法继续处理了，通常在认证或者安全检查失败时直接返回错误响应。</p><p>再来一个 InterceptorConfig 对拦截器进行配置：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InterceptorConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LoggerInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">&quot;/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Configuration 注解用于定义配置类，干掉了以往 Spring 繁琐的 xml 配置文件。</p><p>编写一个用于被拦截的控制器 MyInterceptorController：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/myinterceptor&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyInterceptorController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;沉默王二是傻X&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@RestController 注解相当于 @Controller + @ResponseBody 注解，@ResponseBody 注解用于将 Controller 方法返回的对象，通过适当的 HttpMessageConverter 转换为指定格式后，写入到 Response 对象的 body 数据区，通常用来返回 JSON 或者 XML 数据，返回 JSON 数据的情况比较多。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-27c3f03f-8cca-4cbe-84cb-005075c0b8c9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>启动服务器，访问 <code>http://localhost:8080/myinterceptor/hello</code>。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-dcd99eeb-c00e-4a7a-a1c2-f8c5ca952aed.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在控制台可以看到拦截器中的日志信息：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-20bb0987-77c8-4069-a59f-bbd2d5584d8c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>无论是过滤器还是拦截器，都属于AOP（面向切面编程）思想的具体实现。除了这两种实现之外，还有另一种更灵活的AOP实现技术，即 Aspect，在编程喵实战项目里，你可以看到 Aspect 具体实现。</p><p>比如说统一日志切面 WebLogAspect，就是用来记录请求信息的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebLogAspect</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">WebLogAspect</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;execution(public * com.codingmore.controller.*.*(..))&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">webLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">&quot;webLog()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doBefore</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@AfterReturning</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;webLog()&quot;</span><span class="token punctuation">,</span> returning <span class="token operator">=</span> <span class="token string">&quot;ret&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterReturning</span><span class="token punctuation">(</span><span class="token class-name">Object</span> ret<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;webLog()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">doAround</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//获取当前请求对象</span>
        <span class="token class-name">ServletRequestAttributes</span> attributes <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ServletRequestAttributes</span><span class="token punctuation">)</span> <span class="token class-name">RequestContextHolder</span><span class="token punctuation">.</span><span class="token function">getRequestAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        webLog<span class="token punctuation">.</span><span class="token function">setStartTime</span><span class="token punctuation">(</span>startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        webLog<span class="token punctuation">.</span><span class="token function">setUri</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        logMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;parameter&quot;</span><span class="token punctuation">,</span>webLog<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        logMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;spendTime&quot;</span><span class="token punctuation">,</span>webLog<span class="token punctuation">.</span><span class="token function">getSpendTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        logMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;description&quot;</span><span class="token punctuation">,</span>webLog<span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}&quot;</span><span class="token punctuation">,</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>webLog<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据方法和传入的参数获取请求参数
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过拦截后的请求信息大概是这样的：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-7a4b219d-bd3e-435e-a2dc-93f4fe4e8cc2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="监听器" tabindex="-1"><a class="header-anchor" href="#监听器" aria-hidden="true">#</a> 监听器</h2><p>根据监听对象可以把监听器分为 3 类：</p><hr>`,53),r={href:"https://javabetter.cn/zhishixingqiu/",target:"_blank",rel:"noopener noreferrer"},k=n("strong",null,"编程喵",-1),d=n("hr",null,null,-1),v=n("h2",{id:"源码路径",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#源码路径","aria-hidden":"true"},"#"),s(" 源码路径：")],-1),m={href:"https://github.com/itwanger/coding-more",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/itwanger/codingmore-learning/tree/main/codingmore-filter-interceptor-listener",target:"_blank",rel:"noopener noreferrer"},g=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1);function f(h,w){const a=p("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("更多内容，只针对《二哥的Java进阶之路》星球用户开放，需要的小伙伴可以"),n("a",r,[s("戳链接🔗"),t(a)]),s("加入我们的星球，一起学习，一起卷。。"),k,s("🐱是一个 Spring Boot+Vue 的前后端分离项目，融合了市面上绝大多数流行的技术要点。通过学习实战项目，你可以将所学的知识通过实践进行检验、你可以拓宽自己的技术边界，你可以掌握一个真正的实战项目是如何从 0 到 1 的。")]),d,v,n("blockquote",null,[n("ul",null,[n("li",null,[s("编程喵："),n("a",m,[s("https://github.com/itwanger/coding-more"),t(a)])]),n("li",null,[s("过滤器，拦截器、监听器专用："),n("a",b,[s("https://github.com/itwanger/coding-more"),t(a)])])])]),g])}const j=e(l,[["render",f],["__file","Filter-Interceptor-Listener.html.vue"]]);export{j as default};
