
let str = ` <ul>
              <% if (obj.show) { %>
                <% for (var i = 0; i < obj.users.length; i++) { %>
                  <li>
                    <a href="<%= obj.users[i].url %>">
                      <%= obj.users[i].name %>
                    </a>
                  </li>
                <% } %>
              <% } else { %>
                <p>不展示列表</p>
              <% } %>
            </ul> `;


function template(str, object) {
  
}

