// ============================================================
// 125CPV Church Network App
// ============================================================

(function () {
  'use strict';

  // --- Constants ---
  var PASSWORD = 'ForWord125!';
  var HEALTH_COLORS = {
    7: '#22c55e',
    6: '#4ade80',
    5: '#eab308',
    4: '#f97316'
  };
  var HEALTH_DEFAULT = '#ef4444';

  function getHealthColor(cmds) {
    if (cmds >= 7) return HEALTH_COLORS[7];
    if (cmds === 6) return HEALTH_COLORS[6];
    if (cmds === 5) return HEALTH_COLORS[5];
    if (cmds === 4) return HEALTH_COLORS[4];
    return HEALTH_DEFAULT;
  }

  function circleRadius(d) {
    if (d.data.isRoot) return 24;
    return Math.max(18, Math.sqrt(d.data.believers) * 5.5);
  }

  // ============================================================
  // Password Gate
  // ============================================================
  function checkAuth() {
    if (sessionStorage.getItem('church-auth')) {
      hideLogin();
      return true;
    }
    showLogin();
    return false;
  }

  function showLogin() {
    var overlay = document.getElementById('login-overlay');
    if (overlay) overlay.style.display = 'flex';
  }

  function hideLogin() {
    var overlay = document.getElementById('login-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  function initPasswordGate() {
    var btn = document.getElementById('login-btn');
    var input = document.getElementById('login-password');
    if (!btn || !input) return;

    function attempt() {
      if (input.value === PASSWORD) {
        sessionStorage.setItem('church-auth', '1');
        hideLogin();
      } else {
        input.value = '';
        input.placeholder = 'Incorrect password';
        input.classList.add('shake');
        setTimeout(function () { input.classList.remove('shake'); }, 500);
      }
    }

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') attempt();
    });
  }

  // ============================================================
  // Tab Navigation
  // ============================================================
  function initTabs() {
    var tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-page');
        // Deactivate all tabs and pages
        tabs.forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
        // Activate selected
        tab.classList.add('active');
        var page = document.getElementById('page-' + target);
        if (page) page.classList.add('active');
        // Re-fit the network view when switching to its tab
        if (target === '2026' && window.view2026) {
          setTimeout(function () { window.view2026.fitToView(); }, 50);
        }
        if (target === 'full' && window.viewFull) {
          setTimeout(function () { window.viewFull.fitToView(); }, 50);
        }
      });
    });
  }

  // ============================================================
  // NetworkView - independent view for each tab
  // ============================================================
  function NetworkView(config) {
    this.key = config.key;               // "2026" or "full"
    this.rawData = config.rawData;
    this.label = config.label;
    this.sublabel = config.sublabel;
    this.canvasId = config.canvasId;
    this.detailId = config.detailId;
    this.statsId = config.statsId;

    this.data = null;
    this.root = null;
    this.svg = null;
    this.g = null;
    this.zoom = null;
    this.currentLayout = 'tree';
    this.selectedNode = null;

    this.init();
  }

  NetworkView.prototype.init = function () {
    this.data = loadSavedEdits(this.key, this.rawData);
    this.buildHierarchy();
    this.renderStats();
    this.createSvg();
    this.renderTree();
    this.bindZoomControls();
    this.bindLayoutToggle();
  };

  NetworkView.prototype.buildHierarchy = function () {
    var tree = buildTree(this.data, this.label, this.sublabel);
    assignGenerations(tree);
    this.root = d3.hierarchy(tree);
  };

  NetworkView.prototype.createSvg = function () {
    var container = document.getElementById(this.canvasId);
    // Remove any existing SVG
    d3.select('#' + this.canvasId).selectAll('svg').remove();

    var w = container.clientWidth || 900;
    var h = container.clientHeight || 600;

    this.svg = d3.select('#' + this.canvasId)
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    this.g = this.svg.append('g');

    var self = this;
    this.zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', function (event) {
        self.g.attr('transform', event.transform);
        var level = container.querySelector('.zoom-level');
        if (level) level.textContent = Math.round(event.transform.k * 100) + '%';
      });

    this.svg.call(this.zoom);
  };

  NetworkView.prototype.renderTree = function () {
    this.g.selectAll('*').remove();

    if (this.currentLayout === 'radial') {
      var radialLayout = d3.tree()
        .size([2 * Math.PI, 280])
        .separation(function (a, b) {
          return (a.parent === b.parent ? 1.5 : 2.5) / (a.depth || 1);
        });
      radialLayout(this.root);
      this.renderRadial();
    } else {
      var treeLayout = d3.tree()
        .nodeSize([90, 120])
        .separation(function (a, b) {
          return a.parent === b.parent ? 1.1 : 1.4;
        });
      treeLayout(this.root);
      this.renderStandard();
    }
  };

  NetworkView.prototype.renderStandard = function () {
    var self = this;
    var g = this.g;

    // Links
    g.selectAll('.link')
      .data(this.root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#475569')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .attr('d', function (d) {
        return 'M' + d.source.x + ',' + d.source.y +
               'C' + d.source.x + ',' + (d.source.y + d.target.y) / 2 +
               ' ' + d.target.x + ',' + (d.source.y + d.target.y) / 2 +
               ' ' + d.target.x + ',' + d.target.y;
      });

    // Nodes
    var nodes = g.selectAll('.node')
      .data(this.root.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
      .style('cursor', 'pointer')
      .on('click', function (event, d) {
        event.stopPropagation();
        if (!d.data.isRoot) self.showDetail(d);
      });

    // Circles
    nodes.append('circle')
      .attr('r', function (d) { return circleRadius(d); })
      .attr('fill', function (d) {
        if (d.data.isRoot) return '#1e293b';
        return getHealthColor(d.data.commandsObeyed);
      })
      .attr('stroke', function (d) {
        return self.selectedNode && self.selectedNode.data.id === d.data.id ? '#fff' : 'rgba(255,255,255,0.2)';
      })
      .attr('stroke-width', function (d) {
        return self.selectedNode && self.selectedNode.data.id === d.data.id ? 3 : 1.5;
      });

    // Church name above circle
    nodes.append('text')
      .attr('dy', function (d) { return d.data.isRoot ? 4 : -circleRadius(d) - 6; })
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', function (d) { return d.data.isRoot ? '13px' : '11px'; })
      .attr('font-weight', function (d) { return d.data.isRoot ? '700' : '600'; })
      .text(function (d) { return d.data.name; });

    // Root sublabel (network description)
    nodes.filter(function (d) { return d.data.isRoot; })
      .append('text')
      .attr('dy', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .text(function (d) { return d.data.location || ''; });

    // B=X line inside circle (stacked)
    nodes.filter(function (d) { return !d.data.isRoot; })
      .append('text')
      .attr('dy', -3)
      .attr('text-anchor', 'middle')
      .attr('fill', function (d) { return d.data.commandsObeyed >= 5 ? '#000' : '#fff'; })
      .attr('font-size', '9px')
      .attr('font-weight', '700')
      .text(function (d) { return 'B=' + d.data.believers; });

    // 7=X line inside circle (stacked below)
    nodes.filter(function (d) { return !d.data.isRoot; })
      .append('text')
      .attr('dy', 8)
      .attr('text-anchor', 'middle')
      .attr('fill', function (d) { return d.data.commandsObeyed >= 5 ? '#000' : '#fff'; })
      .attr('font-size', '9px')
      .attr('font-weight', '700')
      .text(function (d) { return '7=' + d.data.commandsObeyed; });

    // Leader name below circle
    nodes.filter(function (d) { return !d.data.isRoot && d.data.leader; })
      .append('text')
      .attr('dy', function (d) { return circleRadius(d) + 14; })
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .text(function (d) { return d.data.leader; });

    // Elder cross marker - inside circle if elderInside, outside if not
    nodes.filter(function (d) { return !d.data.isRoot && d.data.hasElder; })
      .append('text')
      .attr('dx', function (d) {
        return d.data.elderInside ? 0 : circleRadius(d) + 4;
      })
      .attr('dy', function (d) {
        return d.data.elderInside ? -(circleRadius(d) - 10) : -4;
      })
      .attr('text-anchor', function (d) {
        return d.data.elderInside ? 'middle' : 'start';
      })
      .attr('fill', function (d) {
        return d.data.elderInside ? '#ef4444' : '#fbbf24';
      })
      .attr('font-size', function (d) {
        return d.data.elderInside ? '10px' : '14px';
      })
      .text('\u2720');
  };

  NetworkView.prototype.renderRadial = function () {
    var self = this;
    var g = this.g;

    function radialPoint(d) {
      if (d.data.isRoot) return [0, 0];
      var radius = d.depth * 180;
      return [radius * Math.cos(d.x - Math.PI / 2), radius * Math.sin(d.x - Math.PI / 2)];
    }

    // Links
    g.selectAll('.link')
      .data(this.root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#475569')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .attr('d', function (d) {
        var sp = radialPoint(d.source);
        var tp = radialPoint(d.target);
        return 'M' + sp[0] + ',' + sp[1] +
               'C' + (sp[0] + tp[0]) / 2 + ',' + (sp[1] + tp[1]) / 2 +
               ' ' + (sp[0] + tp[0]) / 2 + ',' + (sp[1] + tp[1]) / 2 +
               ' ' + tp[0] + ',' + tp[1];
      });

    // Nodes
    var nodes = g.selectAll('.node')
      .data(this.root.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        var p = radialPoint(d);
        return 'translate(' + p[0] + ',' + p[1] + ')';
      })
      .style('cursor', 'pointer')
      .on('click', function (event, d) {
        event.stopPropagation();
        if (!d.data.isRoot) self.showDetail(d);
      });

    // Circles
    nodes.append('circle')
      .attr('r', function (d) { return circleRadius(d); })
      .attr('fill', function (d) {
        if (d.data.isRoot) return '#1e293b';
        return getHealthColor(d.data.commandsObeyed);
      })
      .attr('stroke', function (d) {
        return self.selectedNode && self.selectedNode.data.id === d.data.id ? '#fff' : 'rgba(255,255,255,0.2)';
      })
      .attr('stroke-width', function (d) {
        return self.selectedNode && self.selectedNode.data.id === d.data.id ? 3 : 1.5;
      });

    // Church name
    nodes.append('text')
      .attr('dy', function (d) { return d.data.isRoot ? 4 : -circleRadius(d) - 6; })
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', function (d) { return d.data.isRoot ? '13px' : '10px'; })
      .attr('font-weight', '600')
      .text(function (d) { return d.data.name; });

    // Root sublabel
    nodes.filter(function (d) { return d.data.isRoot; })
      .append('text')
      .attr('dy', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .text(function (d) { return d.data.location || ''; });

    // B=X stacked inside circle
    nodes.filter(function (d) { return !d.data.isRoot; })
      .append('text')
      .attr('dy', -3)
      .attr('text-anchor', 'middle')
      .attr('fill', function (d) { return d.data.commandsObeyed >= 5 ? '#000' : '#fff'; })
      .attr('font-size', '8px')
      .attr('font-weight', '700')
      .text(function (d) { return 'B=' + d.data.believers; });

    // 7=X stacked inside circle
    nodes.filter(function (d) { return !d.data.isRoot; })
      .append('text')
      .attr('dy', 7)
      .attr('text-anchor', 'middle')
      .attr('fill', function (d) { return d.data.commandsObeyed >= 5 ? '#000' : '#fff'; })
      .attr('font-size', '8px')
      .attr('font-weight', '700')
      .text(function (d) { return '7=' + d.data.commandsObeyed; });

    // Leader name below circle
    nodes.filter(function (d) { return !d.data.isRoot && d.data.leader; })
      .append('text')
      .attr('dy', function (d) { return circleRadius(d) + 14; })
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .text(function (d) { return d.data.leader; });

    // Elder cross
    nodes.filter(function (d) { return !d.data.isRoot && d.data.hasElder; })
      .append('text')
      .attr('dx', function (d) { return circleRadius(d) + 4; })
      .attr('dy', -4)
      .attr('fill', '#fbbf24')
      .attr('font-size', '14px')
      .text('\u2720');
  };

  // ============================================================
  // Stats
  // ============================================================
  NetworkView.prototype.renderStats = function () {
    var el = document.getElementById(this.statsId);
    if (!el) return;
    var total = this.data.length;
    var believers = this.data.reduce(function (s, c) { return s + c.believers; }, 0);
    var avgHealth = total > 0
      ? (this.data.reduce(function (s, c) { return s + c.commandsObeyed; }, 0) / total).toFixed(1)
      : '0';
    el.innerHTML =
      '<div class="stat-item"><div class="stat-value">' + total + '</div><div class="stat-label">Churches</div></div>' +
      '<div class="stat-item"><div class="stat-value">' + believers + '</div><div class="stat-label">Believers</div></div>' +
      '<div class="stat-item"><div class="stat-value">' + avgHealth + '</div><div class="stat-label">Avg Health</div></div>';
  };

  // ============================================================
  // Zoom Controls
  // ============================================================
  NetworkView.prototype.bindZoomControls = function () {
    var self = this;

    var zoomIn = document.querySelector('.zoom-in[data-target="' + this.key + '"]');
    var zoomOut = document.querySelector('.zoom-out[data-target="' + this.key + '"]');
    var zoomFit = document.querySelector('.zoom-fit[data-target="' + this.key + '"]');

    if (zoomIn) {
      zoomIn.addEventListener('click', function () {
        self.svg.transition().duration(300).call(self.zoom.scaleBy, 1.3);
      });
    }
    if (zoomOut) {
      zoomOut.addEventListener('click', function () {
        self.svg.transition().duration(300).call(self.zoom.scaleBy, 0.7);
      });
    }
    if (zoomFit) {
      zoomFit.addEventListener('click', function () {
        self.fitToView();
      });
    }
  };

  NetworkView.prototype.fitToView = function () {
    var container = document.getElementById(this.canvasId);
    if (!container || !this.g.node()) return;
    var bounds = this.g.node().getBBox();
    if (bounds.width === 0 && bounds.height === 0) return;
    var cw = container.clientWidth || 900;
    var ch = container.clientHeight || 600;
    var padding = 80;
    var scale = 0.85 * Math.min(
      (cw - padding) / bounds.width,
      (ch - padding) / bounds.height
    );
    scale = Math.max(scale, 0.15);
    scale = Math.min(scale, 1.2);
    var tx = cw / 2 - scale * (bounds.x + bounds.width / 2);
    var ty = ch / 2 - scale * (bounds.y + bounds.height / 2);
    this.svg.transition().duration(500)
      .call(this.zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
  };

  // ============================================================
  // Layout Toggle (tree / radial)
  // ============================================================
  NetworkView.prototype.bindLayoutToggle = function () {
    var self = this;
    var btns = document.querySelectorAll('[data-layout][data-target="' + this.key + '"]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        self.currentLayout = btn.getAttribute('data-layout');
        self.buildHierarchy();
        self.renderTree();
        setTimeout(function () { self.fitToView(); }, 100);
      });
    });
  };

  // ============================================================
  // Editable Detail Panel
  // ============================================================
  NetworkView.prototype.showDetail = function (d) {
    this.selectedNode = d;
    // Re-render to update selection highlight
    this.renderTree();

    var panel = document.getElementById(this.detailId);
    if (!panel) return;
    panel.classList.remove('empty');

    var church = d.data;
    var lineage = this.getLineage(d);
    var childCount = d.children ? d.children.length : 0;
    var childChips = '';
    if (d.children) {
      d.children.forEach(function (c) {
        childChips += '<span class="child-chip">' + escHtml(c.data.name) + '</span>';
      });
    }

    panel.innerHTML =
      '<div class="detail-card">' +
        '<div class="detail-field">' +
          '<label>Church Name</label>' +
          '<input type="text" data-field="name" value="' + escAttr(church.name) + '">' +
        '</div>' +
        '<div class="detail-field">' +
          '<label>Leader</label>' +
          '<input type="text" data-field="leader" value="' + escAttr(church.leader) + '">' +
        '</div>' +
        '<div class="detail-row">' +
          '<div class="detail-field">' +
            '<label>Believers</label>' +
            '<input type="number" data-field="believers" value="' + church.believers + '">' +
          '</div>' +
          '<div class="detail-field">' +
            '<label>Commands (0-7)</label>' +
            '<input type="number" min="0" max="7" data-field="commandsObeyed" value="' + church.commandsObeyed + '">' +
          '</div>' +
        '</div>' +
        '<div class="detail-row">' +
          '<div class="detail-field">' +
            '<label>Year Founded</label>' +
            '<input type="number" data-field="yearFounded" value="' + church.yearFounded + '">' +
          '</div>' +
          '<div class="detail-field">' +
            '<label>Location</label>' +
            '<input type="text" data-field="location" value="' + escAttr(church.location) + '">' +
          '</div>' +
        '</div>' +
        '<div class="detail-field">' +
          '<label>Elder</label>' +
          '<div class="elder-toggles">' +
            '<label><input type="checkbox" id="elder-check"' + (church.hasElder ? ' checked' : '') + '> Has Elder</label>' +
            '<label><input type="checkbox" id="elder-inside"' + (church.elderInside ? ' checked' : '') + '> Inside Church</label>' +
          '</div>' +
        '</div>' +
        '<div class="detail-field">' +
          '<label>Notes</label>' +
          '<textarea data-field="notes" rows="3">' + escHtml(church.notes) + '</textarea>' +
        '</div>' +
        '<div class="detail-lineage">' +
          '<strong>Lineage:</strong> ' + lineage +
        '</div>' +
        '<div class="detail-children">' +
          '<strong>Planted ' + childCount + ' churches</strong>' +
          '<div>' + childChips + '</div>' +
        '</div>' +
        '<div class="detail-actions">' +
          '<button class="btn-save">Save Changes</button>' +
          '<button class="btn-cancel">Cancel</button>' +
        '</div>' +
      '</div>';

    // Bind save / cancel
    var self = this;
    var saveBtn = panel.querySelector('.btn-save');
    var cancelBtn = panel.querySelector('.btn-cancel');

    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        self.saveDetail(church.id, panel);
      });
    }
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        // Re-populate form with original (in-memory) data
        self.showDetail(d);
      });
    }
  };

  NetworkView.prototype.saveDetail = function (churchId, panel) {
    var updates = {};
    panel.querySelectorAll('[data-field]').forEach(function (el) {
      var field = el.getAttribute('data-field');
      var val = el.tagName === 'TEXTAREA' ? el.value : el.value;
      if (field === 'believers' || field === 'commandsObeyed' || field === 'yearFounded') {
        val = parseInt(val, 10) || 0;
      }
      updates[field] = val;
    });

    var elderCheck = panel.querySelector('#elder-check');
    var elderInside = panel.querySelector('#elder-inside');
    updates.hasElder = elderCheck ? elderCheck.checked : false;
    updates.elderInside = elderInside ? elderInside.checked : false;

    // Clamp commands
    if (updates.commandsObeyed < 0) updates.commandsObeyed = 0;
    if (updates.commandsObeyed > 7) updates.commandsObeyed = 7;

    // Save to localStorage
    saveChurchEdit(this.key, churchId, updates);

    // Update in-memory data
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id === churchId) {
        Object.assign(this.data[i], updates);
        break;
      }
    }

    // Rebuild and re-render
    this.buildHierarchy();
    this.renderTree();
    this.renderStats();

    // Re-select the same node in the new tree
    var self = this;
    var found = null;
    this.root.descendants().forEach(function (n) {
      if (n.data.id === churchId) found = n;
    });
    if (found) {
      self.selectedNode = found;
      self.renderTree();
      self.showDetail(found);
    }
  };

  NetworkView.prototype.getLineage = function (d) {
    var path = [];
    var current = d;
    while (current) {
      path.unshift(current.data.name);
      current = current.parent;
    }
    return path.join(' \u2192 ');
  };

  // Refresh from raw data (for external use)
  NetworkView.prototype.refresh = function () {
    this.data = loadSavedEdits(this.key, this.rawData);
    this.buildHierarchy();
    this.renderTree();
    this.renderStats();
  };

  // ============================================================
  // HTML Helpers
  // ============================================================
  function escAttr(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escHtml(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ============================================================
  // About Page
  // ============================================================
  function renderAboutPage() {
    var el = document.getElementById('about-content');
    if (!el) return;

    el.innerHTML =
      '<div class="about-page">' +

        '<div class="about-header">' +
          '<h1>Vision 125</h1>' +
          '<p class="about-subtitle">Church Planting in Central India</p>' +
          '<blockquote class="about-verse">' +
            '\u201CThen he said to his disciples, \u2018The harvest is plentiful but the workers are few. ' +
            'Ask the Lord of the harvest, therefore, to send out workers into his harvest field.\u2019\u201D' +
            '<cite>Matthew 9:37\u201338</cite>' +
          '</blockquote>' +
        '</div>' +

        '<div class="about-section">' +
          '<h2>The Problem</h2>' +
          '<p>India is home to over 1.4 billion people, making it the most populous country on earth. ' +
          'Yet vast regions of Central India remain unreached by the gospel. Hundreds of millions of people in ' +
          'tribal and rural communities have never heard the name of Jesus. The Satpura region of Madhya Pradesh ' +
          'and surrounding states contain thousands of villages with no church, no Bible, and no Christian witness. ' +
          'These are among the least reached people groups on the planet.</p>' +
        '</div>' +

        '<div class="about-section">' +
          '<h2>The Ministry</h2>' +
          '<p>Vision 125 (also known as 125CPV) is a church planting vision born in 2020 from Habakkuk 2:2\u20133. ' +
          'Indigenous leaders\u2014trained and empowered by Pastor Monty and the HHRC network\u2014plant reproducing ' +
          'house churches across Central India. Each church is measured by obedience to 7 biblical commands, not by ' +
          'buildings or budgets. Leaders are trained using a 2/4 field training model, and churches are expected to ' +
          'reproduce within their first year. Elders are raised from within each local congregation, ensuring ' +
          'sustainability and indigenous leadership.</p>' +
          '<p>The model is simple, biblical, and reproducible: every believer a disciple-maker, every church ' +
          'a church-planting church.</p>' +
        '</div>' +

        '<div class="about-section">' +
          '<h2>The Impact</h2>' +
          '<div class="about-stats-grid">' +
            '<div class="about-stat">' +
              '<div class="about-stat-value">275\u2013300</div>' +
              '<div class="about-stat-label">Total Churches Planted</div>' +
            '</div>' +
            '<div class="about-stat">' +
              '<div class="about-stat-value">5,000+</div>' +
              '<div class="about-stat-label">Baptisms</div>' +
            '</div>' +
            '<div class="about-stat">' +
              '<div class="about-stat-value">134</div>' +
              '<div class="about-stat-label">New Churches in 2024</div>' +
            '</div>' +
            '<div class="about-stat">' +
              '<div class="about-stat-value">3</div>' +
              '<div class="about-stat-label">States Reached</div>' +
            '</div>' +
          '</div>' +
          '<p>What began as a single church in 2002 has grown into a multi-generational movement spanning ' +
          'Madhya Pradesh, Chhattisgarh, and Uttar Pradesh. The network has seen explosive growth since the ' +
          'Vision 125 initiative launched, with churches reproducing into 4th and 5th generations.</p>' +
        '</div>' +

        '<div class="about-section">' +
          '<h2>The Invitation</h2>' +
          '<p>We believe God is doing something extraordinary in Central India, and we invite you to be part of it. ' +
          'Partnership means joining a movement where your investment multiplies through indigenous leaders who are ' +
          'already on the ground, already sharing the gospel, and already planting churches. Every dollar goes further ' +
          'because the model is lean, the leaders are local, and the vision is kingdom-sized.</p>' +
          '<p>You can partner through prayer, giving, and vision trips. When you support Vision 125, you are not ' +
          'funding a program\u2014you are fueling a movement.</p>' +
        '</div>' +

        '<div class="about-section">' +
          '<h2>Ministry Partner Portfolio</h2>' +
          '<div class="about-partner-info">' +
            '<p><strong>Partner since:</strong> 2022</p>' +
            '<p><strong>Vision Trips:</strong> 2023, 2025</p>' +
            '<p>Our partnership with the 125CPV network gives us a front-row seat to one of the most exciting ' +
            'church planting movements in the world. Through regular reporting, real-time data, and on-the-ground ' +
            'visits, we maintain close connection with the leaders and churches we support.</p>' +
          '</div>' +
        '</div>' +

        '<div class="about-section">' +
          '<h2>Prayer Requests</h2>' +
          '<ul class="about-prayer-list">' +
            '<li>Pray for the 25+ vision leaders as they train and send new church planters into unreached villages.</li>' +
            '<li>Pray for new believers to grow in obedience to the 7 commands and become disciple-makers.</li>' +
            '<li>Pray for the development of indigenous elders within each local church.</li>' +
            '<li>Pray for protection and provision for leaders who face opposition and hardship in remote areas.</li>' +
            '<li>Pray for the Vision 125 goal: that 125 new church planting visions would be launched from this network.</li>' +
          '</ul>' +
        '</div>' +

      '</div>';
  }

  // ============================================================
  // Initialization
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    // Password gate
    initPasswordGate();
    checkAuth();

    // Tab navigation
    initTabs();

    // Network views
    window.view2026 = new NetworkView({
      key: '2026',
      rawData: churchData2026,
      label: '2026 Church Plants',
      sublabel: '2026',
      canvasId: 'canvas-2026',
      detailId: 'detail-2026',
      statsId: 'stats-2026'
    });

    window.viewFull = new NetworkView({
      key: 'full',
      rawData: churchDataFull,
      label: 'Full Network',
      sublabel: 'HHRC + All Branches',
      canvasId: 'canvas-full',
      detailId: 'detail-full',
      statsId: 'stats-full'
    });

    // Fit views after initial render
    setTimeout(function () {
      window.view2026.fitToView();
      window.viewFull.fitToView();
    }, 200);

    // 7 Commands page
    if (typeof renderCommandsPage === 'function') {
      renderCommandsPage();
    }

    // About page
    renderAboutPage();

    // Handle window resize
    window.addEventListener('resize', function () {
      if (window.view2026) {
        window.view2026.createSvg();
        window.view2026.renderTree();
        setTimeout(function () { window.view2026.fitToView(); }, 100);
      }
      if (window.viewFull) {
        window.viewFull.createSvg();
        window.viewFull.renderTree();
        setTimeout(function () { window.viewFull.fitToView(); }, 100);
      }
    });
  });

})();
